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
    console.log("gere 1");
    try {
      console.log("gere 2");

      // Query to check if a document with the same username exists
      const q = query(
        collection(db, "liveLadder"),
        where("username", "==", newDocument.username)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (!querySnapshot.empty) {
        console.log("gere 3");

        // If document with the username exists, update the document
        const existingDoc = querySnapshot.docs[0]; // Take the first matching document
        const docRef = doc(db, "liveLadder", existingDoc.id); // Reference to the existing document
        await setDoc(docRef, newDocument); // Replace the existing document
      } else {
        console.log("gere 4");

        // If no document with the username exists, add a new document
        await addDoc(collection(db, "liveLadder"), newDocument);
      }
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

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

    const formData = new FormData();
    formData.append("image", image);

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
      postNewDocument(result.player1);
      postNewDocument(result.player2);
      alert("Image uploaded successfully!");
      window.location.reload();
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
