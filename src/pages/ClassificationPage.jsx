/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import "../styles/classification.scss";
import { Button, Container, IconButton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FileBase64 from "react-file-base64";
import { LoadingButton } from "@mui/lab";

function ClassificationPage() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState([]);

  const uploadImage = (files) => {
    setImagePreview(URL.createObjectURL(files.file));
    setImageUrl(files);
  };

  const clearImage = () => {
    setImagePreview(null);
    setImageUrl(null);
  };

  const detectImage = async () => {
    const dataPlant = {
      api_key: process.env.REACT_APP_PLANTID_API_KEY,
      images: [imageUrl.base64.slice(23)],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "name_authority",
        "watering",
        "url",
        "name_authority",
        "wiki_description",
        "edible_parts",
        "taxonomy",
        "synonyms",
      ],
    };
    setLoading(true);
    fetch(process.env.REACT_APP_PLANTID_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPlant),
    })
      .then((response) => response.json())
      .then((responseData) => setData(responseData) && setLoading(false));
  };

  // const setPicIdData = () => {
  //   const dataPlant = {
  //     api_key: "jQQMVA3ffDYe0j9iKYzM2A1QL55pCRtoybPcPVSviERYS09Emy",
  //     images: [plantFile.base64.slice(23)],
  //     modifiers: ["crops_fast", "similar_images"],
  //     plant_language: "en",
  //     plant_details: [
  //       "common_names",
  //       "name_authority",
  //       "watering",
  //       "url",
  //       "name_authority",
  //       "wiki_description",
  //       "edible_parts",
  //       "taxonomy",
  //       "synonyms",
  //     ],
  //   };

  //   const dataHealth = {
  //     api_key: "jQQMVA3ffDYe0j9iKYzM2A1QL55pCRtoybPcPVSviERYS09Emy",
  //     images: [plantFile.base64.slice(23)],
  //     modifiers: ["crops_fast", "similar_images"],
  //     language: "id",
  //     disease_details: [
  //       "cause",
  //       "common_names",
  //       "classification",
  //       "description",
  //       "treatment",
  //       "url"
  //     ],
  //   };

  //   fetch("https://api.plant.id/v2/identify", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(dataPlant),
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => console.log("Success", responseData));

  //     fetch("https://api.plant.id/v2/health_assessment", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(dataHealth),
  //     })
  //       .then((response) => response.json())
  //       .then((responseData) => console.log("Success", responseData));
  // };

  return (
    <Container sx={{ mt: 3, mb: 5 }}>
      <h1 className="header">Image Detection</h1>
      <div className="inputField">
        <FileBase64
          multiple={false}
          onDone={imagePreview ? null : uploadImage}
          className="uploadInput"
        />
      </div>
      <div className="imageWrapper">
        <div className="imageContent">
          <div className="imageArea">
            {imagePreview && (
              <>
                <IconButton
                  aria-label="delete"
                  className="btnClear"
                  onClick={() => clearImage()}
                >
                  <ClearIcon />
                </IconButton>
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  crossOrigin="anonymous"
                />
              </>
            )}
          </div>
          <div className="imageResult">
            {data.map((result, index) => {
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
        </div>
        {imageUrl && (
          <LoadingButton
            loading={loading}
            loadingIndicator="Loading…"
            variant="contained"
            onClick={detectImage}
          >
            Detect Image
          </LoadingButton>
        )}
      </div>
    </Container>
  );
}

export default ClassificationPage;
