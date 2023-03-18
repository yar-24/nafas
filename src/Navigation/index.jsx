import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Appbar from "../components/Appbar";
import Toast from "../components/kecil/Toast";
import ScrollToTop from "../components/kecil/ScrollToTop";
import Footer from "../components/Footer";
import Top from "../components/kecil/Top";
import alanBtn from "@alan-ai/alan-sdk-web";
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Shop = React.lazy(() => import("../pages/Shop"));
const PlantCare = React.lazy(() => import("../pages/PlantCare"));
const Services = React.lazy(() => import("../pages/Services"));
const Register = React.lazy(() => import("../pages/Register"));
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const DetailProduct = React.lazy(() => import("../pages/DetailProduct"));
const Cart = React.lazy(() => import("../pages/Cart"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));
const DetailServices = React.lazy(() => import("../pages/DetailServices"));
const WriteServices = React.lazy(() => import("../pages/WriteServices"));
const HomeWrite = React.lazy(() => import("../pages/HomeWrite"));
const NotResponding = React.lazy(() => import("../pages/NotResponding"));
const PageSearchBlog = React.lazy(() => import("../pages/PageSearchBlog"));
const ClassificationPage = React.lazy(() => import("../pages/ClassificationPage"));
const CardPlants = React.lazy(() => import("../components/CardPlants"));
const DetailPlant = React.lazy(() => import("../pages/DetailPlant"));

const Navigation = () => {
  const { user } = useSelector((states) => states.auth);
  const [allPlants, setAllPlants] = useState([])
  const [allCategories, setAllCategories] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    alanBtn({
      key: '76978b707b1eade6ae51a8bfdc6b73112e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, plants, allCategories, category}) => {
        if(command === 'plantHeadlines') {
          setAllPlants(plants);
          setAllCategories("")
          navigate('/allPlants');
        } else if(command === 'allCategories') {
          setAllCategories(allCategories)
          setAllPlants("")
          navigate(`/allPlants`);
        } else if(command === 'category'){
          console.log(category)
        }else if(command === 'pageHome'){
          navigate('/')
        } else if(command === 'pageServices'){
          navigate('/services')
        } else if(command === 'pageShop'){
          navigate('/shop')
        } else if(command === 'pagePlantCare'){
          navigate('/plant-care')
        }
      }
    })
  }, [navigate])


  return (
    <>
      <Top />
      <Appbar />
      <Toast />
      <Box component="main" sx={{ pt: { xs: 7, md: 8 }}}>
        <Suspense fallback={<Box height="100vh" />}>
          <Routes>
            <Route element={<Home user={user} />} path="/" />
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
            <Route element={<Services />} path="/services" />
            <Route element={<PlantCare />} path="/plant-care" />
            <Route element={<Shop />} path="/shop" />
            <Route element={<DetailProduct />} path="/product/detail/:id" />
            <Route element={<DetailServices />} path="/blog/detail/:id" />
            <Route element={<ForgotPassword />} path="/forgot-password" />
            <Route element={<ResetPassword />} path="/reset-password" />
            <Route element={<ClassificationPage />} path="/classification-plant" />
            <Route element={<Cart />} path="/cart" />
            <Route
              element={user ? <HomeWrite /> : <Home />}
              path="/blog/dashboard"
            />
            <Route
              element={user ? <WriteServices /> : <Home />}
              path="/blog/write"
            />
            <Route
              element={user ? <WriteServices /> : <Home />}
              path="/blog/edit/:id"
            />
            <Route element={<PageSearchBlog />} path="/search" />
            <Route element={<CardPlants plants={allPlants} categories={allCategories} /> } path="/allPlants" />
            <Route element={<DetailPlant/>} path="/detailPlant/:id" />
            <Route element={<NotResponding />} path="/*" />
          </Routes>
        </Suspense>
      </Box>
      <ScrollToTop />
      <Footer />
    </>
  );
};

export default Navigation;
