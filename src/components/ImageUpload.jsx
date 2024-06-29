// src/components/ImageUpload.js

import React, { useState } from 'react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="image-upload-box">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageChange} />
      {image && <img src={image} alt="Uploaded" className="uploaded-image" />}
    </div>
  );
}

export default ImageUpload;
