import React, { useEffect, useRef, useState } from "react";
import Cropper from 'react-easy-crop';
import axios from 'axios';
import './index.css'
import { FaTimes } from "react-icons/fa";
import { BsCloudArrowUpFill } from "react-icons/bs";
import {  Button, Flex  } from 'antd/lib';
import image1 from "./logo512.png"

let API = process.env.BACKEND_API_URL || 'http://127.0.0.1:5000';
function ImageDetectionPage() {
    let returnImg
    const [image, setImage] = useState(false);
    const [fileName, setFileName] = useState("No selected file");
    const [result_img, setResultImg] = useState(null);

    const fileChangeHandler = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setFileName(e.target.files[0].name);
    };

    const handleDetect = async () => {
        if (image.length > 0) {
            const formData = new FormData();
            console.log(image)
            
            const file = await fetch(image).then(r => r.blob()).then(image => new File([image], fileName, { type: image.type }))


            // const myFile = new File([image], fileName, {
            //     type: image.type,
            // });
            
            console.log(file);
            formData.append("file", file);
            try {
                const response = await axios.post(`${API}/upload`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log('Images uploaded successfully:', response.data);
                console.log(response.data.file_url)
                setResultImg(response.data.file_url)
              } catch (error) {
                console.error('Error uploading images:', error);
              }
        } else {
            alert('No image selected')
        }
    }

    return (
        <div style={{ width: '100%', backgroundColor: 'green' }}>
            <div className="container-app">
            <h1 className="title">Image Input</h1>
            <div className="container-image-choice">
                {image ? (
                <div className="wrap-image-true">
                    <span className="btn-close">
                    <FaTimes
                        onClick={() => {
                        setFileName("No selected file");
                        setImage(null);
                        setResultImg(null);
                        }}
                    />
                    </span>
                    <img
                    src={image}
                    alt={fileName}
                    className="selected-image"
                    // onClick={() => document.querySelector(".input-field").click()}
                    />
                    <p className="file-name-image">{fileName}</p>
                </div>
                ) : (
                <div
                    className="wrap-image-false"
                    // onClick={() => document.querySelector(".input-field").click()}
                >
                    <BsCloudArrowUpFill size={100} className="icon-upload" />
                    <input type="file" onChange={fileChangeHandler}/>
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
        <Button type="primary" onClick={handleDetect} style={{ width: '500px'}}>Detect</Button>
        </div>
        </div>
        <div className="image-result">
        <h1 className="title">Image Detection Result</h1>
        <div className="container-image-choice">
            <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
        </div>
        </div>

        <div className="image-description">
        <h1 className="title">Image Description</h1>
        <div className="container-description">
            <div className="description-content">
                <p>overflow:hidden on the #wrapper serves to contain the #first float vertically should it get longer than the non-floated #second div. the second overflow on #second serves to contain the content next to the first float, horizontally otherwise it would go underneath the first float. The extended behaviour of the overflow property was phased in somewhere in CSS2.1, the specs themselves changed in response to a way to contain floats without a clearing element or a clearfix hack, it's technical term is that when used like this it creates a new block formatting context.
                overflow:hidden on the #wrapper serves to contain the #first float vertically should it get longer than the non-floated #second div. the second overflow on #second serves to contain the content next to the first float, horizontally otherwise it would go underneath the first float. The extended behaviour of the overflow property was phased in somewhere in CSS2.1, the specs themselves changed in response to a way to contain floats without a clearing element or a clearfix hack, it's technical term is that when used like this it creates a new block formatting context
                overflow:hidden on the #wrapper serves to contain the #first float vertically should it get longer than the non-floated #second div. the second overflow on #second serves to contain the content next to the first float, horizontally otherwise it would go underneath the first float. The extended behaviour of the overflow property was phased in somewhere in CSS2.1, the specs themselves changed in response to a way to contain floats without a clearing element or a clearfix hack, it's technical term is that when used like this it creates a new block formatting context </p>
            </div>
        </div>
        </div>
    </div>
  );
}

export default ImageDetectionPage;