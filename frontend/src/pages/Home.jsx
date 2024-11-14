import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctoes from "../components/TopDoctoes";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctoes />
      <Banner />
    </div>
  );
};

export default Home;
