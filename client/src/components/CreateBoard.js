import React from "react";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";
import Board from "./Board";

const CreateBoard = () => {
  return (
    <>
      <PageHeader header={"Create Board"} />
      <Board />
    </>
  );
};

export default connect()(CreateBoard);
