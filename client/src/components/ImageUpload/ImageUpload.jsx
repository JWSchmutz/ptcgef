import React, { useState } from "react";
import Button from "../Button/Button";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import db from "../../firebase";

const ImageUpload = () => {
  const postNewDocument = async (newDocument) => {
    try {
      // Query to check if a document with the same username exists
      const q = query(
        collection(db, "liveLadder"),
        where("username", "==", newDocument.username)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (!querySnapshot.empty) {
        // If document with the username exists, update the document
        const existingDoc = querySnapshot.docs[0]; // Take the first matching document
        const docRef = doc(db, "liveLadder", existingDoc.id); // Reference to the existing document
        await setDoc(docRef, newDocument); // Replace the existing document
        alert("player added");
      } else {
        // If no document with the username exists, add a new document
        await addDoc(collection(db, "liveLadder"), newDocument);
        alert("player added");
      }
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.target;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        const url = URL.createObjectURL(file);
        setImage(file);
        setPreviewUrl(url);
        break;
      }
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("No image to upload!");
      return;
    }
    console.log(dimensions);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("dimensions", JSON.stringify(dimensions));
    setUploading(true);
    setError(null);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }

      const result = await response.json();
      if (result.player1.elo) postNewDocument(result.player1);
      if (result.player2.elo) postNewDocument(result.player2);
      alert("Image uploaded successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
      }}
      onPaste={handlePaste}
    >
      <p>Paste an image here (Ctrl+V / Cmd+V)</p>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          style={{ maxWidth: "100%", marginTop: "10px" }}
          onLoad={handleImageLoad}
        />
      )}
      <br />
      {image && (
        <Button
          handleClick={handleUpload}
          disabled={uploading}
          style={{ marginTop: "10px" }}
          text={uploading ? "Uploading..." : "Upload Image"}
        ></Button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
