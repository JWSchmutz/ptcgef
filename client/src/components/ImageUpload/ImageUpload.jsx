import React, { useState } from "react";
import Button from "../Button/Button";

const ImageUpload = () => {
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
      alert("Image uploaded successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      window.location.reload();
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
