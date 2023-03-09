/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "../styles/classification.scss";
import { Button, Container, Typography } from "@mui/material";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Tombol from "../components/kecil/Tombol";

function ClassificationPage() {
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState([]);

  const imageRef = useRef();
  const textInputRef = useRef();
  const fileInputRef = useRef();

  const uploadImage = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
  };

  const uploadTrigger = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
    setResults([]);
  };

  const loadModel = async () => {
    setIsModelLoading(true);
    try {
      const model = await mobilenet.load();
      setModel(model);
      setIsModelLoading(false);
    } catch (error) {
      console.log(error);
      setIsModelLoading(false);
    }
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel();
    });
  }, []);

  if (isModelLoading) {
    return (
      <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center" ,height: "50vh" }}>
        <Typography
          variant="h4"
          component="h2"
        >
          Initializing...
        </Typography>
      </Container>
    );
  }

  const detectImage = async () => {
    textInputRef.current.value = "";
    const results = await model.classify(imageRef.current);
    setResults(results);
  };

  return (
    <Container sx={{mt: 3, mb: 5}}>
      <h1 className="header">Image Detection</h1>
      <div className="inputField">
        <input
          type="file"
          accept="image/*"
          capture="camera"
          className="uploadInput"
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <Tombol  onClick={uploadTrigger} variant="contained" startIcon={<CameraAltIcon />} label="Upload" />
        <span className="or">OR</span>
        <input
          type="text"
          placeholder="Enter Image URL"
          ref={textInputRef}
          onChange={handleInputChange}
        />
      </div>
      <div className="imageWrapper">
        <div className="imageContent">
          <div className="imageArea">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Image Preview"
                crossOrigin="anonymous"
                ref={imageRef}
              />
            )}
          </div>
          {results.length > 0 && (
            <div className="imageResult">
              {results.map((result, index) => {
                return (
                  <div className="result" key={result.className}>
                    <span className="name">{result.className}</span>
                    <span className="accuracy">
                      Accuracy Level: {(result.probability * 100).toFixed(2)}%{" "}
                      {index === 0 && (
                        <span className="bestGuess">Best Guess</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {imageUrl && (
          <Button variant="contained" onClick={detectImage}>Detect Image</Button>
        )}
      </div>
    </Container>
  );
}

export default ClassificationPage;
