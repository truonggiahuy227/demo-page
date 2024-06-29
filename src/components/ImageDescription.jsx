// src/components/ImageDescription.js

import React, { useState } from 'react';

function ImageDescription() {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="description-box">
      <h2>Image Description</h2>
      <textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter image description here..."
      ></textarea>
    </div>
  );
}

export default ImageDescription;
