import React from "react";
import Menu from "./Menu";
import Board from "./Board";
import "../styles/Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper flex-row">
      <Menu />
      <Board />
    </div>
  );
};

export default Home;
