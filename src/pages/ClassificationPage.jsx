// /* eslint-disable jsx-a11y/img-redundant-alt */
// import React, { useEffect, useState, useRef } from "react";
// import "../styles/classification.scss";
// import { Button, Container, IconButton, Typography } from "@mui/material";
// import ClearIcon from "@mui/icons-material/Clear";
// import FileBase64 from "react-file-base64";
// import { LoadingButton } from "@mui/lab";
// import * as tf from '@tensorflow/tfjs';
// import tfjsModel from '../utils/tfjs_model/model.json'

// function ClassificationPage() {
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [data, setData] = useState([]);
//   const [model, setModel] = useState(null);

//   const imageRef = useRef()

//   const uploadImage = (files) => {
//     setImagePreview(URL.createObjectURL(files.file));
//     setImageUrl(files);
//   };

//   const onImage = (e) => {
//     const {files} = e.target
//     if(files.length > 0) {
//       const url = URL.createObjectURL(files[0])
//       setImageUrl(url)
//     } else {
//       setImageUrl(null)
//     }
//     // const file = e.target.files[0];
//     // setImageUrl(file);
//     // setImagePreview(URL.createObjectURL(file));
//   };

//   const loadModel = async () => {
//     setLoading(true)
//     try {
//       const model = await tf.io.browserFiles(tfjsModel)
//       setModel(model)
//       setLoading(false)
//     } catch (error) {
//       console.log(error);
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     loadModel()
//   }, [])

//   if(loading){
//     return <h2>loading....</h2>
//   }

//   console.log(imageUrl);

//   async function detectImage() {
//     const result = await model.predict(imageRef.current)
//     console.log(result);

//   //   let image = new Image(256, 256);
//   //   image.src = imagePreview

//   //   let tensor = tf.browser.fromPixels(image);
//   // // 3) Menyesuaikan ukuran tensor dengan ukuran input pada model
//   // tensor = tensor.expandDims(0);
//   // // 4) Lakukan normalisasi ukuran pixel dari (0, 255) -> (0, 1)
//   // tensor = tensor.div(255);
//   // // 5) Sesuaikan dimensi tensor dengan dimensi input pada model
//   // // Contoh: dari [x] menjadi [[x]], x = tensor
//   // tensor = tensor.cast("float32");
//   // // 6) Melakukan proses prediksi
//   // const dataPrediksi = await model.predict(tensor);
//   }

//   const clearImage = () => {
//     setImagePreview(null);
//     setImageUrl(null);
//   };

//   // const detectImage = async () => {
//   //   const dataPlant = {
//   //     api_key: process.env.REACT_APP_PLANTID_API_KEY,
//   //     images: [imageUrl.base64.slice(23)],
//   //     modifiers: ["crops_fast", "similar_images"],
//   //     plant_language: "en",
//   //     plant_details: [
//   //       "common_names",
//   //       "name_authority",
//   //       "watering",
//   //       "url",
//   //       "name_authority",
//   //       "wiki_description",
//   //       "edible_parts",
//   //       "taxonomy",
//   //       "synonyms",
//   //     ],
//   //   };
//   //   setLoading(true);
//   //   fetch(process.env.REACT_APP_PLANTID_URL, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(dataPlant),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((responseData) => setData(responseData) && setLoading(false));
//   // };

//   // const setPicIdData = () => {
//   //   const dataPlant = {
//   //     api_key: "jQQMVA3ffDYe0j9iKYzM2A1QL55pCRtoybPcPVSviERYS09Emy",
//   //     images: [plantFile.base64.slice(23)],
//   //     modifiers: ["crops_fast", "similar_images"],
//   //     plant_language: "en",
//   //     plant_details: [
//   //       "common_names",
//   //       "name_authority",
//   //       "watering",
//   //       "url",
//   //       "name_authority",
//   //       "wiki_description",
//   //       "edible_parts",
//   //       "taxonomy",
//   //       "synonyms",
//   //     ],
//   //   };

//   //   const dataHealth = {
//   //     api_key: "jQQMVA3ffDYe0j9iKYzM2A1QL55pCRtoybPcPVSviERYS09Emy",
//   //     images: [plantFile.base64.slice(23)],
//   //     modifiers: ["crops_fast", "similar_images"],
//   //     language: "id",
//   //     disease_details: [
//   //       "cause",
//   //       "common_names",
//   //       "classification",
//   //       "description",
//   //       "treatment",
//   //       "url"
//   //     ],
//   //   };

//   //   fetch("https://api.plant.id/v2/identify", {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(dataPlant),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((responseData) => console.log("Success", responseData));

//   //     fetch("https://api.plant.id/v2/health_assessment", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(dataHealth),
//   //     })
//   //       .then((response) => response.json())
//   //       .then((responseData) => console.log("Success", responseData));
//   // };

//   return (
//     <Container sx={{ mt: 3, mb: 5 }}>
//       <h1 className="header">Image Detection</h1>
//       <div className="inputField">
//         {/* <FileBase64
//           multiple={false}
//           onDone={imagePreview ? null : uploadImage}
//           className="uploadInput"
//         /> */}
//         <input type="file" onChange={onImage} />
//       </div>
//       <div className="imageWrapper">
//         <div className="imageContent">
//           <div className="imageArea">
//             {imagePreview && (
//               <>
//                 <IconButton
//                   aria-label="delete"
//                   className="btnClear"
//                   onClick={() => clearImage()}
//                 >
//                   <ClearIcon />
//                 </IconButton>
//                 <img
//                   src={imagePreview}
//                   alt="Image Preview"
//                   crossOrigin="anonymous"
//                   ref={imagePreview}
//                 />
//               </>
//             )}
//           </div>
//           <div className="imageResult">
//             {data.map((result, index) => {
//               return (
//                 <div className="result" key={result.className}>
//                   <span className="name">{result.className}</span>
//                   <span className="accuracy">
//                     Accuracy Level: {(result.probability * 100).toFixed(2)}%{" "}
//                     {index === 0 && (
//                       <span className="bestGuess">Best Guess</span>
//                     )}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         {/* {imageUrl && ( */}
//           <LoadingButton
//             loading={loading}
//             loadingIndicator="Loading…"
//             variant="contained"
//             onClick={detectImage}
//           >
//             Detect Image
//           </LoadingButton>
//         {/* )} */}
//       </div>
//     </Container>
//   );
// }

// export default ClassificationPage;
