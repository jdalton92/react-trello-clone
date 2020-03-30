import React from "react";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";
import Board from "./Board";

const ViewBoard = ({ board }) => {
  return (
    <>
      <PageHeader header={board.title} />
      <Board />
    </>
  );
};

export default connect()(ViewBoard);
