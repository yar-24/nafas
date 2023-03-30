import React from "react";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const Shop = React.lazy(() => import("./Shop"));
const PlantCare = React.lazy(() => import("./PlantCare"));
const Services = React.lazy(() => import("./Services"));
const Register = React.lazy(() => import("./Register"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword"));
const DetailProduct = React.lazy(() => import("./DetailProduct"));
const Cart = React.lazy(() => import("./Cart"));
const ResetPassword = React.lazy(() => import("./ResetPassword"));
const DetailServices = React.lazy(() => import("./DetailServices"));
const WriteServices = React.lazy(() => import("./WriteServices"));
const HomeWrite = React.lazy(() => import("./HomeWrite"));
const NotResponding = React.lazy(() => import("./NotResponding"));
const PageSearchBlog = React.lazy(() => import("./PageSearchBlog"));
const ClassificationPage = React.lazy(() => import("./ClassificationPage"));
const CardPlants = React.lazy(() => import("../components/CardPlants"));
const DetailPlant = React.lazy(() => import("./DetailPlant"));

export {
  Home,
  Login,
  Shop,
  PlantCare,
  Services,
  Register,
  ForgotPassword,
  DetailProduct,
  Cart,
  ResetPassword,
  DetailServices,
  WriteServices,
  HomeWrite,
  NotResponding,
  PageSearchBlog,
  ClassificationPage,
  CardPlants,
  DetailPlant,
};
