import React, { useEffect, useRef, useState } from "react";
import Cropper from 'react-easy-crop';
import axios from 'axios';
import './index.css'
import { FaTimes } from "react-icons/fa";
import { BsCloudArrowUpFill } from "react-icons/bs";
import {  Button, Flex  } from 'antd/lib';


const { invokeModel, invokeModelImage, resizeFile } = require('../utils/client-bedrock-runtime.js');


let API = process.env.BACKEND_API_URL || 'http://127.0.0.1:5000';

function UploadingImagePage() {
    
    const [image, setImage] = useState(false);
    const [fileName, setFileName] = useState("No selected file");
    const [result_img, setResultImg] = useState(null);
    const [base64, setBase64] = useState('');
    const [emotion, setEmotion] = useState([{"top_emotion": "None", "score": 0}]);
    const [brand, setBrand] = useState([]);

    const fileChangeHandler = async (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        if (e.target.files[0]) {
            const reader = new FileReader();

            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              setBase64(reader.result);
            };
          }
        //   const rs_image = await resizeFile(e.target.files[0]);
        // setBase64(rs_image);
        setFileName(e.target.files[0].name);
    };

    const handleDetect = async () => {
        if (image.length > 0) {
            const formData = new FormData();
            console.log(image)
            
            const file = await fetch(image).then(r => r.blob()).then(image => new File([image], fileName, { type: image.type }))
           
            
            console.log(file);
            formData.append("file", file);
            try {
                const response = await axios.post('https://03ba-123-16-55-212.ngrok-free.app', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                console.log('Images uploaded successfully:', response.data);
                console.log(response)
                setEmotion(response.data)
              } catch (error) {
                console.error('Error uploading images:', error);
              }
            
              try {
                console.log(base64)
                const res = await invokeModelImage(base64);
                const jsonString = new TextDecoder().decode(res.body);
                console.log(jsonString)
                const modelRes = JSON.parse(jsonString);
                console.log(modelRes)
              } catch (error) {
                console.error('Error uploading images:', error);
              }

        } else {
            alert('No image selected')
        }
    }
    const emoArr = emotion.map((emo) => <li>{emo['top_emotion'].toString()}</li>);
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
            <h1 className="title">Brand Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>


        <div className="image-result">
            <h1 className="title">Product Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>


        <div className="image-result">
            <h1 className="title">People Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>


        <div className="image-result">
            <h1 className="title">Activities Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>

        <div className="image-result">
            <h1 className="title">Emotions Detection Result</h1>
            <div className="container-image-choice">
                {emoArr}
            </div>
        </div>

        <div className="image-result">
            <h1 className="title">Promotional Material Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>

        <div className="image-result">
            <h1 className="title">Context Detection Result</h1>
            <div className="container-image-choice">
                <img src={result_img} style={{ width: "-webkit-fill-available", height: "-webkit-fill-available" }}/>
            </div>
        </div>

    </div>
  );
} 

export default UploadingImagePage