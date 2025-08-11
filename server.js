const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
const FormData = require("form-data");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("/addresses", async (req, res) => {
  // Make a request for a user with a given ID
  axios
    .get(
      "https://geocoding.geo.census.gov/geocoder/locations/address" +
        req._parsedUrl.search
    )
    .then(function (response) {
      // handle success
      res.json(response.data.result.addressMatches);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/events", async (req, res) => {
  const coordinates = req._parsedUrl.query
    .replace("x=", "")
    .replace("y=", "")
    .split("&");
  const lati = coordinates[1];
  const longi = coordinates[0];

  const body = {
    versionInfo: {
      moduleVersion: "aD4PIylnLVsmHIsDjLX1bw",
      apiVersion: "RhHgee2LqYvHUvBIv_IYdw",
    },
    viewName: "MainFlow.Home",
    screenData: {
      variables: {
        LocationFilters: {
          ProductTypes: {
            List: [
              {
                Id: "1",
                Label: "tcg",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "2",
                Label: "vg",
                IsEnabled: false,
                IsSelected: false,
              },
              {
                Id: "3",
                Label: "pgo",
                IsEnabled: false,
                IsSelected: false,
              },
            ],
          },
          EventType: {
            List: [
              {
                Id: "8",
                Label: "prerelease",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "9",
                Label: "league_cup",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "10",
                Label: "league_challenge",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "11",
                Label: "play_session",
                IsEnabled: false,
                IsSelected: false,
              },
              {
                Id: "16",
                Label: "friendly_tournaments",
                IsEnabled: false,
                IsSelected: false,
              },
            ],
          },
        },
        IsLoading: true,
        IsFilterOpen: false,
        isBigEventDetail: false,
        MaxRecords: 20,
        BigEventDetail: {
          EventGUID: "",
          EventTypeId: "0",
          EventType: "",
          StatusId: "0",
          Status: "",
          Name: "",
          VenueName: "",
          StreetAddress: "",
          SecondaryAddress: "",
          City: "",
          State: "",
          PostalCode: "",
          Country: "",
          StartDate: "1900-01-01",
          EndDate: "1900-01-01",
          RegistrationDateStartDate: "1900-01-01T00:00:00",
          DocumentationSubmissionDate: "1900-01-01T00:00:00",
          Cost: "",
          Description: "",
          RegistrationLink: "",
          Latitude: "",
          Longitude: "",
          Badge: "",
          SpectatorRegistrationLink: "",
          RegistrationDateEndDate: "1900-01-01T00:00:00",
          SpectatorRegistrationStartDate: "1900-01-01T00:00:00",
          SpectatorRegistrationEndDate: "1900-01-01T00:00:00",
        },
        RelatedEvents: {
          List: [],
          EmptyListItem: {
            EventGUID: "",
            EventTypeId: "0",
            EventType: "",
            StatusId: "0",
            Status: "",
            Name: "",
            VenueName: "",
            StreetAddress: "",
            SecondaryAddress: "",
            City: "",
            State: "",
            PostalCode: "",
            Country: "",
            StartDate: "1900-01-01",
            EndDate: "1900-01-01",
            RegistrationDateStartDate: "1900-01-01T00:00:00",
            DocumentationSubmissionDate: "1900-01-01T00:00:00",
            Cost: "",
            Description: "",
            RegistrationLink: "",
            Latitude: "",
            Longitude: "",
            Badge: "",
            SpectatorRegistrationLink: "",
            RegistrationDateEndDate: "1900-01-01T00:00:00",
            SpectatorRegistrationStartDate: "1900-01-01T00:00:00",
            SpectatorRegistrationEndDate: "1900-01-01T00:00:00",
          },
        },
        PremierEventsIdList: "",
        BigEventGUID: "",
        BigEventName: "",
        BaseURL: "https://events.pokemon.com",
        ShowSpecialLocatorIframe: false,
        locale: "en-US",
        _localeInDataFetchStatus: 1,
        filters: "",
        _filtersInDataFetchStatus: 1,
        latitude: lati,
        _latitudeInDataFetchStatus: 1,
        longitude: longi,
        _longitudeInDataFetchStatus: 1,
        range: "250",
        _rangeInDataFetchStatus: 1,
        iskm: "False",
        _iskmInDataFetchStatus: 1,
      },
    },
    clientVariables: {
      LastURL: "",
      GAPI: "AIzaSyAXzdVpFJq7oPTepVgdX7NgBy5AutT_YCo",
      UserLocale: "en-US",
      isSearchByEnter: false,
      Range: "250",
      LocaleFooter:
        "{'LocaleId':1,'Label':'English US','Order':2,'Is_Active':true,'SelectRegionText':'Select Your Region','HomePageLink':'https://www.pokemon.com/us/','HomePageImgLink':'https://assets.pokemon.com/static2/_ui/img/footer/pokemon_company.png','BBBCaruLink':'https://caru.bbbprograms.org/seal/Confirmation/1596150491','BBBCaruImgLink':'https://caru.bbb.org/seal/thepokemoncompanyinternational-seal-1596150491.png','SocialLinkFacebook':'https://www.facebook.com/pokemon/','SocialLinkTwitter':'https://www.twitter.com/pokemon/','SocialLinkInstagram':'https://www.instagram.com/pokemon/','SocialLinkYoutube':'https://www.youtube.com/user/pokemon/','TermsOfUseText':'Terms of Use','TermsOfUseLink':'https://www.pokemon.com/us/terms-of-use/','PrivacyNoticeText':'Privacy Notice','PrivacyNoticeLink':'https://www.pokemon.com/us/privacy-notice/','LegalText':'Legal Information','LegalLink':'https://www.pokemon.com/us/legal/','NintendoLink':'https://www.nintendo.com/','NintendoImgLink':'https://media.nintendo.com/share/nclood/stable/en-us/modules/nav/images/logo-nintendo.svg','NintendoSwitchLink':'https://www.nintendo.com/switch/','NintendoSwitchImgLink':'https://www.nintendo.com/content/dam/noa/en_US/images/switch/switch-logo.svg','RatingSystemText':'ESRB','RatingSystemLink':'https://www.esrb.org/','LeavingSiteYoutubeTextBody':'Notice: If you click on the YouTube video above, you will leave Pokemon.com. The PokÃ©mon Company International is not responsible for the content of any linked website that is not operated by The PokÃ©mon Company International. Please note that these websitesâ€™ privacy policies and security practices may differ from The PokÃ©mon Company Internationalâ€™s standards.','LeavingSiteTextHeader':'You are about to leave a site operated by The PokÃ©mon Company International, Inc.','LeavingSiteTextBody':'The PokÃ©mon Company International is not responsible for the content of any linked website that is not operated by The PokÃ©mon Company International. Please note that these websitesâ€™ privacy policies and security practices may differ from The PokÃ©mon Company Internationalâ€™s standards.','LeavingSiteTextCancel':'Cancel','LeavingSiteTextContinue':'Continue','CopyrightTextPokemon':'Â©2025 PokÃ©mon.','CopyrightTextNintendo':'Â©1995â€“2025 Nintendo / Creatures Inc. / GAME FREAK Inc.','CopyrightTextSpikechunsoft':'Â©1993â€“2025 Spike Chunsoft.','NintendoTrademarkText':'PokÃ©mon and Nintendo Switch are trademarks of Nintendo.','CustomerServiceText':'Customer Service','CustomerServiceLink':'https://support.pokemon.com','CookiePageText':'Cookie Page','CookiePageLink':'https://www.pokemon.com/us/cookie-page/','HeaderLocaleCode':'en'}",
      Username: "",
      isKm: false,
      Latitude: lati,
      Longitude: longi,
      AreEventsBeingSearched: true,
      OldUserLocale: "en-US",
      Near: "London, UK",
    },
  };

  axios
    .post(
      "https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/Home/DataActionGetLocations",
      body, // Axios automatically stringifies JSON
      {
        headers: {
          accept: "application/json",
          "accept-language": "en-US,en;q=0.9,fr;q=0.8",
          "content-type": "application/json; charset=UTF-8",
          "outsystems-locale": "en-US",
          priority: "u=1, i",
          "sec-ch-ua":
            '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-csrftoken": "T6C+9iB49TLra4jEsMeSckDMNhQ=",
          cookie:
            "visid_incap_3066823=/DahcEisRVKyYbnPQ9CY31HeMWcAAAAAQUIPAAAAAAAmqUjK7zcxLFG4KOJ4RLGE; visid_incap_3029391=lNZTfpqoRxCJU+ReBCXR2S92O2cAAAAAQUIPAAAAAAAOasjgKHFmL98A51/R6KmM; visid_incap_3154303=6yehEc/+Tl+BV3tLJKVoNkIaUmcAAAAAQUIPAAAAAAAAzjf2X7OIayRdjXt+L7OL; OptanonAlertBoxClosed=2025-03-26T21:35:52.077Z; _ga=GA1.1.1125921179.1745432155; visid_incap_2832311=MqHaZTpWQ++kcqlDvwm6j1ECGWgAAAAAQUIPAAAAAADDf4Zg+vQamVyVsnuefk6N; _ga_V0JTVBC6Y3=GS2.1.s1748197681$o3$g0$t1748197681$j0$l0$h0; visid_incap_3039444=icBhO6/+TwGdgj2NLLbnLsQgV2gAAAAAQUIPAAAAAAAjS3+jr2WwP+aR8owrDQVc; visid_incap_3018525=MPfixuf+TCallFiRD0zY2c4ZkmgAAAAAQUIPAAAAAAAtjcz52iL9AzLjO1vmIXUq; visid_incap_2884021=GGf+2MzRRVSNKqFtT5Tzp3QrkmgAAAAAQUIPAAAAAACzveaSSnUVAUGm9bjlJJ+F; visid_incap_3028897=bUVK28ZRQG+zLBDE4J/CZ3UrkmgAAAAAQUIPAAAAAAAvnc91mHmMR50xxAH4PwKb; visid_incap_2897837=oWjm3H+hQ8mL3o+s9ZpbRTxZkmgAAAAAQUIPAAAAAAA+isKEBN8wiNU2cYzdG+rL; osVisitor=179f3362-8497-428b-a4a4-e89b130cfa66; nr1Users=lid%3dAnonymous%3btuu%3d0%3bexp%3d0%3brhs%3dXBC1ss1nOgYW1SmqUjSxLucVOAg%3d%3bhmc%3dThNnmd8MNPF6REGQagFzFdcuRI0%3d; nr2Users=crf%3dT6C%2b9iB49TLra4jEsMeSckDMNhQ%3d%3buid%3d0%3bunm%3d; incap_ses_764_2884021=LnnNMKHTfA/Tc5LqQkaaCjJ7k2gAAAAAAxCDs2pJYrwTOETR61Xc/w==; nlbi_2897837=I/WycVisBgk2Pj4ctxGxdQAAAABoYcTEb+2AKK3CM+o9S/0f; OptanonConsent=isGpcEnabled=0&datestamp=Wed+Aug+06+2025+17%3A56%3A44+GMT%2B0200+(heure+d%E2%80%99%C3%A9t%C3%A9+d%E2%80%99Europe+centrale)&version=6.33.0&isIABGlobal=false&hosts=&consentId=e1590636-c02b-4884-bd6a-2c50b040c259&interactionCount=2&landingPath=NotLandingPage&groups=C0002%3A0%2CC0001%3A1%2CC0004%3A0%2CC0003%3A0&AwaitingReconsent=false&geolocation=BE%3BWAL; nlbi_2884021=2r5uWWLZiTj0cXlKgQq3qwAAAADyJxS6bAcki9N5QLcOf4+j; incap_ses_764_2897837=cuTEAXqdhxYQaZrqQkaaCkWGk2gAAAAATbYL6LmMdFyOjTwkGouQ/Q==; nlbi_2897837_2147483392=A/VOMXuZfQhDQOvWtxGxdQAAAADmlf0RF5khSMmWyd6mfSN7; incap_ses_985_2897837=NRO1H6CbEVaf4jlPWGyrDauMk2gAAAAAt6fy2t8npkJirZHHy4XRaA==; reese84=3:V4QbRz/4/GCKRrzZY3IqDQ==:i1ooHBvzdP7F1TIje2Yyrp50LvrDsyfdopPjhVYbVk62xTtTNUTzVRW9nwsNhulQSiITFzIHtkeeRfuPUXunsNjT2il/EyMbM/i0T4xEIraiBuLkrYkOraVtCD7TFlbBwfZVCzxZ/hg5MSUgM+dWboUOtmoPC6OKDgto+8f9q5Qcz2KyazmcQk1c9cfiFTFAJTM23000CbJHJEFzAxloXz+j5ShthuRKGrEpWqniFl+zd5ZHTLS54rx4k9Z2A+w63hqx2A3aHHaHgX5rpVZzjg70jZfoMOXayM/rf8hxuwybTNUfjxPrThINPxONMVxdF6eQ4IlbYzMeIDY/aN6B50gshLy7XWqs7fApvdPDQuUQ+1xJ7hVNWJdCA/paras/1+V/gi+2Vk8BVi6DaJgh0/8z3h+Za8Tn0kl49F5x95yBJWhT14oAwzGSS5I5+kcwTDwZlrOy8wsGtpVAfaxI1g==:fHKVk2f+Zrwn2GjPgyU8wwMM/ww52H0KEr8eDTTjTKw=; _dd_s=rum=1&id=d7d92333-329a-4a91-b9e1-6825481c4ff1&created=1754500275336&expire=1754501175337; incap_ses_985_2884021=gRoQYv5jdwZzRzpPWGyrDb+Mk2gAAAAAMkmuXY4tYrBWtH0kZTNwqg==",
          Referer: `https://events.pokemon.com/EventLocator/Home?iskm=false&longitude=${longi}&latitude=${lati}&locale=en-US&range=250`,
        },
      }
    )
    .then((response) => {
      const data = response.data;
      return Promise.all(
        data.data.Locations.List.map((store) => {
          const Lat = store.Address.Latitude;
          const Long = store.Address.Longitude;

          const getStoreDistance = (lat1, lon1, lat2, lon2) =>
            3958.8 *
            2 *
            Math.asin(
              Math.sqrt(
                Math.sin(((lat2 - lat1) * Math.PI) / 180 / 2) ** 2 +
                  Math.cos((lat1 * Math.PI) / 180) *
                    Math.cos((lat2 * Math.PI) / 180) *
                    Math.sin(((lon2 - lon1) * Math.PI) / 180 / 2) ** 2
              )
            );

          return getEventsFromStore(
            store.Guid,
            Lat,
            Long,
            store.Display_name,
            store.Display_id,
            "50",
            getStoreDistance(Lat, Long, lati, longi)
          );
        })
      );
    })
    .then((results) => {
      const merged = results.flat();
      filteredMerged = merged.filter((event) => {
        return (
          event.category.includes("tcg") &&
          (event.tags.includes("league_challenge") ||
            event.tags.includes("league_cup") ||
            event.tags.includes("prerelease"))
        );
      });
      res.json(filteredMerged);
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });

  const eventsFromStoreBody = {
    versionInfo: {
      moduleVersion: "Zrs1JQuEq2cAoPXJVuUcxw",
      apiVersion: "jP683rOUBjx4+KnnY4rkjA",
    },
    viewName: "MainFlow.LocationDetail",
    screenData: {
      variables: {
        LocationFilters: {
          ProductTypes: {
            List: [
              {
                Id: "1",
                Label: "tcg",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "2",
                Label: "vg",
                IsEnabled: false,
                IsSelected: false,
              },
              {
                Id: "3",
                Label: "pgo",
                IsEnabled: false,
                IsSelected: false,
              },
            ],
          },
          EventType: {
            List: [
              {
                Id: "8",
                Label: "prerelease",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "9",
                Label: "league_cup",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "10",
                Label: "league_challenge",
                IsEnabled: true,
                IsSelected: false,
              },
              {
                Id: "11",
                Label: "play_session",
                IsEnabled: false,
                IsSelected: false,
              },
              {
                Id: "16",
                Label: "friendly_tournaments",
                IsEnabled: false,
                IsSelected: false,
              },
            ],
          },
        },
        Events: {
          List: [],
          EmptyListItem: {
            Events: {
              Guid: "",
              Activity_type: "",
              Subtype: "",
              Name: "",
              Display_id: "",
              Products: { List: [], EmptyListItem: "" },
              Category: "",
              Start_date: "1900-01-01T00:00:00",
              Address: {
                Guid: "",
                Name: "",
                Full_address: "",
                Latitude: "0",
                Longitude: "0",
                Timezone: "",
              },
              Event_website: "",
              Registration_start: "",
              Registration_end: "",
              Details: "",
              Third_party_registration_website: "",
              Contact_information: { Email: "", Phone: "" },
              Admission: "",
              Activity_division_info: {
                Juniors: {
                  Registration_start: "",
                  Registration_end: "",
                  Admission: "",
                },
                Seniors: {
                  Registration_start: "",
                  Registration_end: "",
                  Admission: "",
                },
                Masters: {
                  Registration_start: "",
                  Registration_end: "",
                  Admission: "",
                },
              },
              Series: {
                Guid: "",
                Name: "",
                Tags: { List: [], EmptyListItem: "" },
              },
              Status: "",
            },
            EventBadge: "",
            EventTypeName: "",
            SpecialEventDescription: "",
            SpecialEventIcon: null,
          },
        },
        IsEventDetail: false,
        EventRecord: {
          Events: {
            Guid: "",
            Activity_type: "",
            Subtype: "",
            Name: "",
            Display_id: "",
            Products: { List: [], EmptyListItem: "" },
            Category: "",
            Start_date: "1900-01-01T00:00:00",
            Address: {
              Guid: "",
              Name: "",
              Full_address: "",
              Latitude: "0",
              Longitude: "0",
              Timezone: "",
            },
            Event_website: "",
            Registration_start: "",
            Registration_end: "",
            Details: "",
            Third_party_registration_website: "",
            Contact_information: { Email: "", Phone: "" },
            Admission: "",
            Activity_division_info: {
              Juniors: {
                Registration_start: "",
                Registration_end: "",
                Admission: "",
              },
              Seniors: {
                Registration_start: "",
                Registration_end: "",
                Admission: "",
              },
              Masters: {
                Registration_start: "",
                Registration_end: "",
                Admission: "",
              },
            },
            Series: {
              Guid: "",
              Name: "",
              Tags: { List: [], EmptyListItem: "" },
            },
            Status: "",
          },
          EventBadge: "",
          EventTypeName: "",
          SpecialEventDescription: "",
          SpecialEventIcon: null,
        },
        locale: "en-US",
        _localeInDataFetchStatus: 1,
        guid: "8140010d-dfd2-65b0-9abb-e6af31b17f97",
        _guidInDataFetchStatus: 1,
        filters: "",
        _filtersInDataFetchStatus: 1,
        display_id: "L6234763",
        _display_idInDataFetchStatus: 1,
        latitude: "34.7242749",
        _latitudeInDataFetchStatus: 1,
        longitude: "-82.7812526",
        _longitudeInDataFetchStatus: 1,
        range: "100",
        _rangeInDataFetchStatus: 1,
        iskm: "False",
        _iskmInDataFetchStatus: 1,
        storename: "EMPIRE GAMES",
        _storenameInDataFetchStatus: 1,
      },
    },
    clientVariables: {
      LastURL: "",
      GAPI: "AIzaSyAXzdVpFJq7oPTepVgdX7NgBy5AutT_YCo",
      UserLocale: "en-US",
      isSearchByEnter: false,
      Range: "100",
      LocaleFooter:
        "{'LocaleId':1,'Label':'English US','Order':2,'Is_Active':true,'SelectRegionText':'Select Your Region','HomePageLink':'https://www.pokemon.com/us/','HomePageImgLink':'https://assets.pokemon.com/static2/_ui/img/footer/pokemon_company.png','BBBCaruLink':'https://caru.bbbprograms.org/seal/Confirmation/1596150491','BBBCaruImgLink':'https://caru.bbb.org/seal/thepokemoncompanyinternational-seal-1596150491.png','SocialLinkFacebook':'https://www.facebook.com/pokemon/','SocialLinkTwitter':'https://www.twitter.com/pokemon/','SocialLinkInstagram':'https://www.instagram.com/pokemon/','SocialLinkYoutube':'https://www.youtube.com/user/pokemon/','TermsOfUseText':'Terms of Use','TermsOfUseLink':'https://www.pokemon.com/us/terms-of-use/','PrivacyNoticeText':'Privacy Notice','PrivacyNoticeLink':'https://www.pokemon.com/us/privacy-notice/','LegalText':'Legal Information','LegalLink':'https://www.pokemon.com/us/legal/','NintendoLink':'https://www.nintendo.com/','NintendoImgLink':'https://media.nintendo.com/share/nclood/stable/en-us/modules/nav/images/logo-nintendo.svg','NintendoSwitchLink':'https://www.nintendo.com/switch/','NintendoSwitchImgLink':'https://www.nintendo.com/content/dam/noa/en_US/images/switch/switch-logo.svg','RatingSystemText':'ESRB','RatingSystemLink':'https://www.esrb.org/','LeavingSiteYoutubeTextBody':'Notice: If you click on the YouTube video above, you will leave Pokemon.com. The Pokémon Company International is not responsible for the content of any linked website that is not operated by The Pokémon Company International. Please note that these websites’ privacy policies and security practices may differ from The Pokémon Company International’s standards.','LeavingSiteTextHeader':'You are about to leave a site operated by The Pokémon Company International, Inc.','LeavingSiteTextBody':'The Pokémon Company International is not responsible for the content of any linked website that is not operated by The Pokémon Company International. Please note that these websites’ privacy policies and security practices may differ from The Pokémon Company International’s standards.','LeavingSiteTextCancel':'Cancel','LeavingSiteTextContinue':'Continue','CopyrightTextPokemon':'©2025 Pokémon.','CopyrightTextNintendo':'©1995–2025 Nintendo / Creatures Inc. / GAME FREAK Inc.','CopyrightTextSpikechunsoft':'©1993–2025 Spike Chunsoft.','NintendoTrademarkText':'Pokémon and Nintendo Switch are trademarks of Nintendo.','CustomerServiceText':'Customer Service','CustomerServiceLink':'https://support.pokemon.com','CookiePageText':'Cookie Page','CookiePageLink':'https://www.pokemon.com/us/cookie-page/','HeaderLocaleCode':'en'}",
      Username: "",
      isKm: false,
      Latitude: "34.7242749",
      Longitude: "-82.7812526",
      AreEventsBeingSearched: true,
      OldUserLocale: "en-US",
      Near: "Central, SC 29630, USA",
    },
  };

  const getEventsFromStore = (
    guid,
    lat,
    long,
    storeName,
    displayId,
    range,
    distance
  ) => {
    eventsFromStoreBody.screenData.variables.guid = guid;
    eventsFromStoreBody.screenData.variables.display_id = displayId;
    eventsFromStoreBody.screenData.variables.latitude = lat;
    eventsFromStoreBody.screenData.variables.longitude = long;
    eventsFromStoreBody.screenData.variables.range = "250";
    eventsFromStoreBody.screenData.variables.storename = storeName;

    eventsFromStoreBody.clientVariables.Range = "250";
    eventsFromStoreBody.clientVariables.Latitude = lat;
    eventsFromStoreBody.clientVariables.Longitude = long;
    const axios = require("axios");

    const url =
      "https://events.pokemon.com/EventLocator/screenservices/EventLocator/MainFlow/LocationDetail/DataActionGetEventsByGUID";

    const headers = {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "outsystems-locale": "en-US",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Not;A=Brand";v="99", "Microsoft Edge";v="139", "Chromium";v="139"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrftoken": "T6C+9iB49TLra4jEsMeSckDMNhQ=",
      cookie:
        "__td_signed=true; OptanonAlertBoxClosed=2025-04-14T21:26:05.085Z; visid_incap_3039444=kcHdoZvbQ9SlkKnhSQvBq0paCmgAAAAAQUIPAAAAAADBsoehzkQqzbTJY+purQ2N; visid_incap_3028897=PlKBJ6l6SgOqHK47d8KIq0paCmgAAAAAQUIPAAAAAABbhYk7mm8R6mJHw+S42iw6; _ga_NSJXD4VBWL=GS2.2.s1749069200$o1$g0$t1749069200$j60$l0$h0; _ga=GA1.1.1485363321.1744633117; visid_incap_3192262=1jfzcWtzQNKzzg0R+oRgPC6IWWgAAAAAQUIPAAAAAAARpsAvZ6uv/2xkIazSwQOA; _ga_VMP75BHL0C=GS2.1.s1750711234$o3$g1$t1750712071$j60$l0$h0; visid_incap_3154303=Nzwuaz+OSLOYE35iarPbny6DeWgAAAAAQUIPAAAAAAAAPn8sskjTMMgKSkuVous+; visid_incap_2816335=6ada5RHGQVqBbbM8EpA718Q0imgAAAAAQUIPAAAAAAAwKMsZ7vY0kq7wBuMo533e; _ga_1WJ15FGXDK=GS2.1.s1753887942$o2$g1$t1753889730$j60$l0$h0; visid_incap_2884021=WExgnQKNTJes3FmruPozsO19kmgAAAAAQUIPAAAAAAAEGtmETZNsU3RV3EBpD11X; visid_incap_2897837=vjynkWV1Q8unalihXg9P5fl9kmgAAAAAQUIPAAAAAADev5BL4F2KadtVmY+DcJBe; osVisitor=961c8c72-c0aa-4292-81c7-684a87845d27; nr1Users=lid%3dAnonymous%3btuu%3d0%3bexp%3d0%3brhs%3dXBC1ss1nOgYW1SmqUjSxLucVOAg%3d%3bhmc%3dThNnmd8MNPF6REGQagFzFdcuRI0%3d; nr2Users=crf%3dT6C%2b9iB49TLra4jEsMeSckDMNhQ%3d%3buid%3d0%3bunm%3d; nlbi_2897837=kowyN4vGsUPLPJ1ztxGxdQAAAACLhkco1LKLOf6nsDKHcnu9; nlbi_2884021=0aZDT48u3QzPnH7IgQq3qwAAAADDekjM739hCebNGkeGWTF9; incap_ses_1844_2884021=4NOaJ7+tjRDKm3EUrTSXGYW2mGgAAAAAd7upI+3H6M9YieqYN6ewHQ==; nlbi_2884021_2147483392=SICRZ4GR9jsW39SfgQq3qwAAAADm4cKIApFPKOTpU62qlAXD; incap_ses_1844_2897837=cZyoZyXqIHOJpXIUrTSXGaa2mGgAAAAAxxJx7KwE9rX80K50oyXU2g==; osVisit=d5e3361e-9b4b-4eaa-aa9b-83ffdccf3084; reese84=3:2F5C6fwen7tVo3v2IxbGUw==:6ewLIdLTSL+G75evW3tyCmHc2m+sIp2MT2AQqDJURVjmwk0obV8TzfneuT+zBL6V9tcwCx4MOPCgAVSgtNh0FrV0/E+Ijxoo86twoaZUxeZC+L2Ehuf9EaEuXrcDaQWjnDbrdA3Z4DTII3W2RJvH5OfG7NGBXgQnDTSa8xSNOgEW9MclQBAL/oLetvLmma1cPPCJuVrsFusNnFWMgQjJ8c5CcBvzrbYXu7grSM3UKAIjQmBKlSkoUwfXFAEo+WGD57w4Js9TBUgCOYBbamKfvqmXaT+Xcz0xLHLF/AKV8OU/p2w1p1SZTeg1sCegod5D3vr43K8BYNqT/o+cAkhJgWHjEGLGFR4GAPzwOR+y4TfOug63ql8+npuDZn0lRW18W6duTFHKWyyC3d1losYu+/jFEK6HU+1wL1B7kAodriDznLW5tGSblavv0hT4UYqh1Tui2SkE9/FzxQ/9+830kA==:RyKSs476WqHalTojXyaH6V8EmYrXXFZKjVo4lT6bcAg=; ASP.NET_SessionId=tuzbzdketmdkedxc5nuxsuzh; nlbi_2897837_2147483392=sRmBK6G/5ASZpWDitxGxdQAAAAC2fdTmDYPby3s1UK6fu+qu; _ga_0HYF2R3MBH=GS2.1.s1754838663$o80$g1$t1754838753$j59$l0$h0; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Aug+10+2025+11%3A12%3A33+GMT-0400+(Eastern+Daylight+Time)&version=6.33.0&isIABGlobal=false&hosts=&consentId=d81383ed-6d06-4e30-a6bf-5414cedb112f&interactionCount=2&landingPath=NotLandingPage&groups=C0002%3A1%2CC0001%3A1%2CC0004%3A0%2CC0003%3A1&AwaitingReconsent=false&geolocation=US%3BSC; _td=a8dd4be3-ca18-4882-8ed9-fe17eef03873; _dd_s=rum=1&id=71f56442-edca-4313-a2d4-f34f217bd2a9&created=1754838701326&expire=1754839670751",
      Referer: `https://events.pokemon.com/EventLocator/LocationDetail?longitude=${long}&iskm=False&storename=${storeName}&display_id=${displayId}&filters=&locale=en-US&range=${range}&latitude=${lat}&guid=${guid}`,
    };

    // Body payload you were sending in fetch
    const data = eventsFromStoreBody;

    return axios
      .post(url, data, { headers })
      .then((res) => {
        const events = res.data.data.Result.List.map((event) => ({
          name: event.Events.Name,
          startDate: event.Events.Start_date,
          admission: event.Events.Admission,
          tags: event.Events.Series.Tags.List,
          category: event.Events.Category,
          city: event.Events.Address.Full_address.split(", ")[1],
          distance,
        }));
        return events;
      })
      .catch((err) => {
        console.error("Error fetching store events:", err.message);
        return [];
      });
  };
});

app.get("/players/:id", async (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://www.pokedata.ovh/standings/${id}/masters/${id}_Masters.json`)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/racers", async (req, res) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      APIKEY: "supercalifragilisticexpialidocious",
      players: [
        { name: "Tor*", game: "tcg", division: "master", country: "NOR" },
      ],
    }),
  };
  axios
    .post(`https://www.pokedata.ovh/2024/api`, options)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/tournaments", async (req, res) => {
  axios
    .get(`https://pokedata.ovh/standings/tournaments/`)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  let isPhone = false;
  const eky1 = "d555efb7c422f380e";
  const eky2 = "163e4a76";
  const eky3 = "f25c65079048540";
  const dimensions = JSON.parse(req.body.dimensions);
  if (dimensions.width < dimensions.height) isPhone = true;
  try {
    const imagePath = path.resolve(req.file.path); // Ensure this points to the uploaded image file

    // Create a FormData instance and append the image file
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath)); // Attach the image file

    const response = await axios.post(
      "https://www.imagetotext.info/api/imageToText",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Include form-data-specific headers
          Authorization: "Bearer " + eky2 + eky1 + eky3,
        },
        maxRedirects: 10,
        timeout: 0,
      }
    );
    let textArray = response.data.result
      .replace(/(\r\n|\n|\r)/gm, "")
      .split("<br />");
    const player1 = {};
    const player2 = {};
    textArray = textArray.filter((ele) => {
      if (ele === "V" || ele === "VS" || ele === "S") return true;
      if (parseInt(ele) > 0) {
        if (ele.length !== 4) return false;
        else if (ele === "2023") return false;
        else if (ele === "2024") return false;
        else if (ele === "2025") return false;
        return true;
      }

      if (ele.length > 15 || ele.length < 3) return false;
      else if (ele === "Pokemo") return false;
      else if (ele === "Pokem") return false;
      else if (ele === "Poke") return false;
      else if (ele === "Pokey") return false;
      else if (ele === "Peken") return false;
      else if (ele === "Pokemon") return false;
      else if (ele === "CUP") return false;
      else if (ele === "PLAYERS") return false;
      else if (ele === "compassion") return false;
      else if (ele === "I could Win") return false;
      else if (ele === "Angham") return false;
      else if (ele === "Anaheim") return false;
      else if (ele === "bottle") return false;
      else if (ele === "STATS") return false;
      else if (ele === "Paken") return false;
      else if (ele === "YOKOHAMA") return false;
      else if (
        ele.includes("Pokém") ||
        ele.includes("PokeNo") ||
        ele.includes("PokeM") ||
        ele.includes("PokéM") ||
        ele.includes("POKEM") ||
        ele.includes("Роком")
      )
        return false;
      else if (
        ele.includes(".") ||
        ele.includes("!") ||
        ele.includes("?") ||
        ele.includes("&")
      )
        return false;
      else if (ele.includes("LIVE")) return false;

      return true;
    });
    if (
      (textArray.indexOf("VS") === 2 ||
        textArray.indexOf("V") === 2 ||
        textArray.indexOf("S") === 2) &&
      !isPhone
    ) {
      player1.elo = parseInt(textArray[0]);
      player1.username = textArray[1];
      player2.username = textArray[3];
      player2.elo = parseInt(textArray[4]);
    }
    if (isPhone) {
      textArray = textArray.filter((el) => !["V", "S", "VS"].includes(el));
      player1.elo = parseInt(textArray[0]);
      player1.username = textArray[2];
      player2.username = textArray[1];
      player2.elo = parseInt(textArray[3]);
      //[03, manuel, 51, jhollen]
      if (isNaN(player2.elo)) {
        player1.elo = parseInt(textArray[0]);
        player1.username = textArray[3];
        player2.username = textArray[1];
        player2.elo = parseInt(textArray[2]);
      }
    }

    const dp2 = path.join(__dirname, "db2.json");

    // Read the existing JSON file
    fs.readFile(dp2, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading db2.json:", err);
        return;
      }

      let jsonArray;
      try {
        // Parse the file contents to a JavaScript array
        jsonArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return;
      }

      // Push textArray into the existing JSON array
      jsonArray.push(textArray);

      // Write the updated array back to the file
      fs.writeFile(
        dp2,
        JSON.stringify(jsonArray, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing to db2.json:", writeErr);
            return;
          }
        }
      );
    });

    const dataPath = path.join(__dirname, "db.json");

    // Read the existing JSON file
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data.json:", err);
        return;
      }

      let jsonArray;
      try {
        // Parse the file contents to a JavaScript array
        jsonArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return;
      }

      // Function to update or add a player
      const upsertPlayer = (player) => {
        const existingIndex = jsonArray.findIndex(
          (item) => item.username === player.username
        );

        if (existingIndex !== -1) {
          // Overwrite the existing entry
          jsonArray[existingIndex] = player;
        } else {
          // Add as a new entry
          jsonArray.push(player);
        }
      };

      // Update or add player1 and player2
      upsertPlayer(player1);
      upsertPlayer(player2);

      // Write the updated array back to the file
      fs.writeFile(
        dataPath,
        JSON.stringify(jsonArray, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing to data.json:", writeErr);
            return;
          }
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting file:", unlinkErr);
              return;
            }
          });
        }
      );
    });
    res.end;
    res.json({
      message: "Image uploaded and processed successfully!",
      player1,
      player2,
      textArray,
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
});

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => console.log("Server started on port " + port));
