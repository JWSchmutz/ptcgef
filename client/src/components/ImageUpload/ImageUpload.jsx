import React, { useState } from "react";
import Button from "../Button/Button";
import { addDoc, collection } from "firebase/firestore";
import db from "../../firebase";

const ImageUpload = () => {
  const postNewDocument = async (newDocument) => {
    try {
      const docRef = await addDoc(collection(db, "liveLadder"), newDocument);
      console.log("Document added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
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
