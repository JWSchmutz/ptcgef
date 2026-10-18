import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams } from "react-router-dom";
import Button from "../../Button/Button";
import "./LocalLists.css";

const TOURNAMENTS_STORAGE_KEY = "ptcgLocalListTournaments";
const DECKLIST_DRAFT_KEY = "ptcgLocalListDraft";

const getToday = () => {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
};

const readResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status}).`);
  }
  return data;
};

function LocalLists() {
  const [searchParams] = useSearchParams();
  const scannedTournamentCode = searchParams.get("code") || "";
  const [view, setView] = useState(scannedTournamentCode ? "decklist" : "home");
  const [savedTournaments, setSavedTournaments] = useState([]);
  const [draft, setDraft] = useState({
    playerName: "",
    playerId: "",
    birthday: "",
    division: "",
    list: "",
  });
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [tournamentType, setTournamentType] = useState("cup");
  const [tournamentDate, setTournamentDate] = useState(getToday);
  const [activeTournament, setActiveTournament] = useState(null);
  const [isCreatingTournament, setIsCreatingTournament] = useState(false);
  const [isSubmittingDecklist, setIsSubmittingDecklist] = useState(false);
  const [tournamentDecklists, setTournamentDecklists] = useState([]);
  const [isRefreshingDecklists, setIsRefreshingDecklists] = useState(false);
  const [decklistsError, setDecklistsError] = useState("");
  const [decklistsUpdatedAt, setDecklistsUpdatedAt] = useState("");
  const [decklistsRefresh, setDecklistsRefresh] = useState(0);
  const [downloadingCode, setDownloadingCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    try {
      const storedTournaments = localStorage.getItem(TOURNAMENTS_STORAGE_KEY);
      const storedDraft = localStorage.getItem(DECKLIST_DRAFT_KEY);
      if (storedTournaments) {
        const parsedTournaments = JSON.parse(storedTournaments);
        if (!Array.isArray(parsedTournaments)) {
          throw new Error("Saved tournament data is invalid.");
        }
        setSavedTournaments(parsedTournaments);
      }
      if (storedDraft) {
        const parsedDraft = JSON.parse(storedDraft);
        setDraft((current) => ({ ...current, ...parsedDraft }));
      }
    } catch (error) {
      setErrorMessage(
        `Could not read Local Lists saved data: ${error.message}`,
      );
    } finally {
      setStorageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;
    try {
      localStorage.setItem(
        TOURNAMENTS_STORAGE_KEY,
        JSON.stringify(savedTournaments),
      );
      localStorage.setItem(DECKLIST_DRAFT_KEY, JSON.stringify(draft));
    } catch (error) {
      setErrorMessage(
        `Could not save Local Lists data in this browser: ${error.message}`,
      );
    }
  }, [draft, savedTournaments, storageLoaded]);

  useEffect(() => {
    setTournamentDecklists([]);
    setDecklistsError("");
    setDecklistsUpdatedAt("");
  }, [activeTournament?.tournamentCode]);

  useEffect(() => {
    if (view !== "tournament" || !activeTournament) return undefined;

    let isCurrent = true;
    let timeoutId;

    const refreshDecklists = async () => {
      setIsRefreshingDecklists(true);
      try {
        const response = await fetch(
          `/api/local-lists/${encodeURIComponent(activeTournament.tournamentCode)}/export`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tournamentSecret: activeTournament.tournamentSecret,
            }),
          },
        );
        const exportedLists = await readResponse(response);
        if (!Array.isArray(exportedLists.decklists)) {
          throw new Error("The server returned invalid decklist data.");
        }
        if (isCurrent) {
          setTournamentDecklists(exportedLists.decklists);
          setDecklistsUpdatedAt(new Date().toLocaleTimeString());
          setDecklistsError("");
        }
      } catch (error) {
        if (isCurrent) {
          setDecklistsError(
            `Could not load submitted decklists: ${error.message}`,
          );
        }
      } finally {
        if (isCurrent) {
          setIsRefreshingDecklists(false);
          timeoutId = window.setTimeout(refreshDecklists, 10000);
        }
      }
    };

    refreshDecklists();

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [activeTournament, decklistsRefresh, view]);

  const updateDraft = (event) => {
    const { name, value } = event.target;
    setDraft((current) => ({ ...current, [name]: value }));
  };

  const handleCreateTournament = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsCreatingTournament(true);

    try {
      const response = await fetch("/api/local-lists/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: tournamentType,
          date: tournamentDate,
        }),
      });
      const tournament = await readResponse(response);
      const nextTournaments = [tournament, ...savedTournaments];
      setActiveTournament(tournament);
      setSavedTournaments(nextTournaments);
      try {
        localStorage.setItem(
          TOURNAMENTS_STORAGE_KEY,
          JSON.stringify(nextTournaments),
        );
        setSuccessMessage(
          "Tournament created. Its TO secret is saved in this browser.",
        );
      } catch (error) {
        setErrorMessage(
          `Tournament created, but this browser could not save the TO secret: ${error.message}. Keep the secret shown below.`,
        );
      }
      setView("tournament");
    } catch (error) {
      setErrorMessage(`Could not create tournament: ${error.message}`);
    } finally {
      setIsCreatingTournament(false);
    }
  };

  const handleSubmitDecklist = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!scannedTournamentCode) {
      setErrorMessage(
        "Scan the tournament QR code before submitting. Your decklist draft is saved in this browser.",
      );
      return;
    }

    setIsSubmittingDecklist(true);
    try {
      const response = await fetch(
        `/api/local-lists/${encodeURIComponent(scannedTournamentCode)}/submissions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        },
      );
      await readResponse(response);
      setDraft((current) => ({ ...current, list: "" }));
      setSuccessMessage("Your decklist was submitted to the tournament.");
    } catch (error) {
      setErrorMessage(`Could not submit decklist: ${error.message}`);
    } finally {
      setIsSubmittingDecklist(false);
    }
  };

  const handleDownloadDecklists = async (tournament) => {
    setErrorMessage("");
    setSuccessMessage("");
    setDownloadingCode(tournament.tournamentCode);
    try {
      const response = await fetch(
        `/api/local-lists/${encodeURIComponent(tournament.tournamentCode)}/export`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tournamentSecret: tournament.tournamentSecret,
          }),
        },
      );
      const exportedLists = await readResponse(response);
      const fileName = `${exportedLists.type} - ${exportedLists.date}.json`;
      const downloadUrl = URL.createObjectURL(
        new Blob([JSON.stringify(exportedLists.decklists, null, 2)], {
          type: "application/json",
        }),
      );
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      setSuccessMessage(
        `Downloaded ${exportedLists.decklists.length} decklist(s) as ${fileName}.`,
      );
    } catch (error) {
      setErrorMessage(
        `Could not download tournament decklists: ${error.message}`,
      );
    } finally {
      setDownloadingCode("");
    }
  };

  const getSubmissionUrl = (tournament) => {
    const url = new URL("/local-lists", window.location.origin);
    url.searchParams.set("code", tournament.tournamentCode);
    return url.toString();
  };

  const copyToClipboard = async (value, label) => {
    setErrorMessage("");
    try {
      await navigator.clipboard.writeText(value);
      setSuccessMessage(`${label} copied to clipboard.`);
    } catch (error) {
      setErrorMessage(
        `Could not copy ${label.toLowerCase()}: ${error.message}`,
      );
    }
  };

  return (
    <main className="local-lists">
      <header className="local-lists-header">
        <div>
          <p className="local-lists-eyebrow">Tournament tools</p>
          <h2 className="page-title">Local Lists</h2>
          <p>
            Create and submit decklists, or prepare a QR code for your event.
          </p>
        </div>
      </header>

      {errorMessage && (
        <p className="local-lists-message error" role="alert">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="local-lists-message success" role="status">
          {successMessage}
        </p>
      )}

      {view === "home" && (
        <section className="local-lists-panel">
          <div className="local-lists-panel-heading">
            <h3>What would you like to do?</h3>
            <p>Your decklist draft is saved in this browser automatically.</p>
          </div>
          <div className="local-lists-actions">
            <Button
              text="Create decklist"
              handleClick={() => setView("decklist")}
            />
            <Button
              text="Create tournament"
              handleClick={() => setView("create-tournament")}
            />
            {savedTournaments.length > 0 && (
              <Button
                text="My tournaments"
                handleClick={() => setView("my-tournaments")}
              />
            )}
          </div>
          {scannedTournamentCode && (
            <p className="local-lists-scan-note">
              Tournament QR code detected. Your decklist will be submitted to
              this event.
            </p>
          )}
        </section>
      )}

      {view === "create-tournament" && (
        <section className="local-lists-panel">
          <div className="local-lists-panel-heading">
            <h3>Create tournament</h3>
            <p>
              A private TO secret is saved only in this browser and is required
              to download submitted lists.
            </p>
          </div>
          <form onSubmit={handleCreateTournament}>
            <label>
              Tournament type
              <select
                value={tournamentType}
                onChange={(event) => setTournamentType(event.target.value)}
              >
                <option value="cup">Cup</option>
                <option value="challenge">Challenge</option>
              </select>
            </label>
            <label>
              Tournament date
              <input
                type="date"
                value={tournamentDate}
                onChange={(event) => setTournamentDate(event.target.value)}
                required
              />
            </label>
            <Button
              type="submit"
              text={isCreatingTournament ? "Creating..." : "Create tournament"}
              disabled={isCreatingTournament}
              classes="local-lists-submit"
            />
          </form>
          <p className="local-lists-security-note">
            Keep this browser’s local data. If it is cleared or you switch
            devices, the TO secret cannot be recovered.
          </p>
        </section>
      )}

      {view === "tournament" && activeTournament && (
        <section className="local-lists-panel tournament-print-area">
          <div className="local-lists-panel-heading">
            <h3>
              {activeTournament.type} - {activeTournament.date}
            </h3>
            <p>Print this QR code or share the submission link with players.</p>
          </div>
          <div className="local-lists-tournament-card">
            <div className="local-lists-qr">
              <QRCodeSVG
                value={getSubmissionUrl(activeTournament)}
                size={256}
                level="M"
                includeMargin
              />
              <p>Scan to submit a decklist</p>
            </div>
            <div className="local-lists-tournament-details">
              <p>
                <strong>Tournament code</strong>
                <code>{activeTournament.tournamentCode}</code>
              </p>

              <div className="local-lists-actions">
                <Button
                  text="Copy player link"
                  handleClick={() =>
                    copyToClipboard(
                      getSubmissionUrl(activeTournament),
                      "Player link",
                    )
                  }
                />
                <Button
                  text="Print QR code"
                  handleClick={() => window.print()}
                />
              </div>
            </div>
          </div>
          {(window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1") && (
            <p className="local-lists-security-note">
              This QR code uses localhost and will only work on this computer.
              Open Local Lists using an address reachable by players before
              printing.
            </p>
          )}
          <div className="local-lists-actions no-print">
            <Button
              text="Download all decklists"
              handleClick={() => handleDownloadDecklists(activeTournament)}
              disabled={downloadingCode === activeTournament.tournamentCode}
            />
            <Button
              text="My tournaments"
              handleClick={() => setView("my-tournaments")}
            />
          </div>
          <section className="local-lists-decklists no-print">
            <div className="local-lists-decklists-heading">
              <div>
                <h3>Submitted decklists ({tournamentDecklists.length})</h3>
                <p>
                  {isRefreshingDecklists
                    ? "Checking for new submissions..."
                    : decklistsUpdatedAt
                      ? `Last checked at ${decklistsUpdatedAt}. Updates automatically every 10 seconds.`
                      : "Loading submissions..."}
                </p>
              </div>
              <Button
                text="Refresh now"
                handleClick={() => setDecklistsRefresh((count) => count + 1)}
                disabled={isRefreshingDecklists}
              />
            </div>
            {decklistsError && (
              <p className="local-lists-message error" role="alert">
                {decklistsError}
              </p>
            )}
            {tournamentDecklists.length === 0 ? (
              <p className="local-lists-empty">
                No decklists have been submitted yet.
              </p>
            ) : (
              <div className="local-lists-submissions">
                {tournamentDecklists.map((submission, index) => (
                  <article
                    className="local-lists-submission"
                    key={`${submission.playerId}-${index}`}
                  >
                    <h4>{submission.playerName}</h4>
                    <p>
                      Player ID: {submission.playerId} ·{" "}
                      {submission.division} · Birthday: {submission.birthday}
                    </p>
                    <details>
                      <summary>View decklist</summary>
                      <pre>{submission.list}</pre>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </section>
        </section>
      )}

      {view === "decklist" && (
        <section className="local-lists-panel">
          <div className="local-lists-panel-heading">
            <h3>Create decklist</h3>
            <p>
              {scannedTournamentCode
                ? "Tournament QR code detected. Complete your details and submit."
                : "Fill this out before or after scanning the tournament QR code. Your draft stays in this browser."}
            </p>
          </div>
          {scannedTournamentCode ? (
            <p className="local-lists-code">
              Tournament code: <code>{scannedTournamentCode}</code>
            </p>
          ) : (
            <p className="local-lists-scan-note">
              No tournament selected yet. Scan a tournament’s QR code to enable
              submission.
            </p>
          )}
          <form onSubmit={handleSubmitDecklist}>
            <label>
              Player name
              <input
                name="playerName"
                autoComplete="name"
                value={draft.playerName}
                onChange={updateDraft}
                maxLength="120"
                required
              />
            </label>
            <label>
              Player ID
              <input
                name="playerId"
                value={draft.playerId}
                onChange={updateDraft}
                maxLength="80"
                required
              />
            </label>
            <label>
              Birthday
              <input
                type="date"
                name="birthday"
                value={draft.birthday}
                onChange={updateDraft}
                max={getToday()}
                required
              />
            </label>
            <label>
              Division
              <select
                name="division"
                value={draft.division}
                onChange={updateDraft}
                required
              >
                <option value="masters">Masters</option>
                <option value="senior">Senior</option>
                <option value="junior">Junior</option>
              </select>
            </label>
            <label>
              Decklist
              <textarea
                name="list"
                value={draft.list}
                onChange={updateDraft}
                placeholder={
                  "Pokémon: 12\n4 Card Name\n\nTrainer: 35\n4 Card Name\n\nEnergy: 13\n"
                }
                maxLength="100000"
                rows="14"
                required
              />
            </label>
            <div className="local-lists-actions">
              <Button
                type="submit"
                text={
                  isSubmittingDecklist ? "Submitting..." : "Submit decklist"
                }
                disabled={isSubmittingDecklist || !scannedTournamentCode}
              />
              <span className="local-lists-save-status">
                Draft saved on this device
              </span>
            </div>
          </form>
        </section>
      )}

      {view === "my-tournaments" && (
        <section className="local-lists-panel">
          <div className="local-lists-panel-heading">
            <h3>My tournaments</h3>
            <p>
              Tournament secrets are kept in this browser. Use the secret
              generated on this device to export lists.
            </p>
          </div>
          {savedTournaments.length === 0 ? (
            <p className="local-lists-empty">
              No locally saved tournaments. Create a tournament to get started.
            </p>
          ) : (
            <div className="local-lists-submissions">
              {savedTournaments.map((tournament) => (
                <article
                  className="local-lists-submission local-lists-saved-tournament"
                  key={tournament.tournamentCode}
                >
                  <div>
                    <h4>
                      {tournament.type} - {tournament.date}
                    </h4>
                    <p>Code: {tournament.tournamentCode}</p>
                  </div>
                  <div className="local-lists-actions">
                    <Button
                      text="Show QR code"
                      handleClick={() => {
                        setActiveTournament(tournament);
                        setView("tournament");
                      }}
                    />
                    <Button
                      text={
                        downloadingCode === tournament.tournamentCode
                          ? "Downloading..."
                          : "Download decklists"
                      }
                      handleClick={() => handleDownloadDecklists(tournament)}
                      disabled={downloadingCode === tournament.tournamentCode}
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default LocalLists;
