import React from "react";
import Banner from "../components/Banner";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import styled from "styled-components";
import { fonts } from "../utils";
import Tombol from "../components/kecil/Tombol";

const Title = styled.h1`
  font-family: ${fonts.inter};
  color: white;
  letter-spacing: 1px ;
`;

const Home = () => {
  return (
    <>
      <Hero />
      <Banner alignItems="end">
        <Title>
          Tips, tricks, and plant guides to make plant care downright easy
        </Title>
        <Tombol label=" Read more blogs" />
      </Banner>
      <CardList>Popular Categories</CardList>
    </>
  );
};

export default Home;
