import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./LiveLadder.css";
import db from "../../../firebase";
import ImageUpload from "../../ImageUpload/ImageUpload";

function LiveLadder() {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track any errors
  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        // Reference to your Firestore collection
        const querySnapshot = await getDocs(collection(db, "liveLadder"));

        // Map through the documents and extract the data
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        fetchedData.sort((a, b) => parseFloat(b.elo) - parseFloat(a.elo));
        setData(fetchedData); // Set the data to state
      } catch (err) {
        setError(err.message); // Set error if any
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means it runs once after the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main id="live-ladder">
      <h2 className="page-title">
        Live Ladder Rankings
        <br />
        BETA VERSION
      </h2>
      <ImageUpload></ImageUpload>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, i) => (
            <tr className="travelcompany-input" key={i}>
              <td> {i + 1}</td>
              <td>{player.username}</td>
              <td>{player.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Notice: Complete data accuracy cannot be guaranteed</p>
    </main>
  );
}

export default LiveLadder;
