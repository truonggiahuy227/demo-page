import React, { useEffect, useRef, useState } from "react";
import Cropper from 'react-easy-crop';
import axios from 'axios';
import './index.css'
import { FaTimes } from "react-icons/fa";
import { BsCloudArrowUpFill } from "react-icons/bs";
import {  Button, Flex  } from 'antd/lib';;


function ImageDetectionPage() {

    const [image, setImage] = useState(false);
    const [fileName, setFileName] = useState("No selected file");

    const fileChangeHandler = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
    };

    const handleDetect = async () => {
        if (image.length > 0) {
            alert('Hello')
        } else {
            alert('No image selected')
        }
    }

    return (
        <div className="container-app">
        <h1>Image Preview</h1>
        <div className="container-image-choice">
            {image ? (
            <div className="wrap-image-true">
                <span className="btn-close">
                <FaTimes
                    onClick={() => {
                    setFileName("No selected file");
                    setImage(null);
                    }}
                />
                </span>
                <img
                src={image}
                alt={fileName}
                className="selected-image"
                onClick={() => document.querySelector(".input-field").click()}
                />
                <p className="file-name-image">{fileName}</p>
            </div>
            ) : (
            <div
                className="wrap-image-false"
                onClick={() => document.querySelector(".input-field").click()}
            >
                <BsCloudArrowUpFill size={100} className="icon-upload" />
                <p className="file-name">Choose a file to upload</p>
            </div>
            )}
            <input
            type="file"
            hidden
            className="input-field"
            onChange={fileChangeHandler}
            />
        </div>
       <div className="btn-detect">
       <Button type="primary" onClick={handleDetect}>Detect</Button>
       </div>
    </div>
  );
}

export default ImageDetectionPage;