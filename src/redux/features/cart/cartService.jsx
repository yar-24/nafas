import { axiosInstance } from "../../../utils";

// Create new product
const addCart = async (cartData, token) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance
    .post("/carts", cartData, config)
    .then((res) => {
      console.log("sukses", res);
    })
    .catch((err) => {
      console.log("err", err);
    });

  return response.data;
};

// // Get product
// const getProduct = async (productId, productData) => {
//   const config = {
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//   };

//   const response = await axiosInstance.get(
//     `/products/${productId}`,
//     productData,
//     config
//   );

//   return response.data.product;
// };

// // Get product
// const getProducts = async () => {
//   const config = {
//     headers: {
//       "content-type": "multipart/form-data",
//     },
//   };

//   const response = await axiosInstance.get("/products", config)

//   return response.data.products;
// };

// //update product
// const updateProduct = async (productData, productId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   };

//   const response = await axiosInstance.put(
//     `/products/${productId}`,
//     productData,
//     config
//   );

//   return response.data;
// };

// // Delete product
// const deleteProduct = async (productId, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "content-type": "multipart/form-data",
//     },
//   };

//   const response = await axiosInstance.delete(`/products/${productId}`, config);

//   return response.data;
// };

const cartService = {
  addCart,
//   getProduct,
//   getProducts,
//   updateProduct,
//   deleteProduct,
};

export default cartService;
