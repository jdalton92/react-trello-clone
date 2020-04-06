import React from "react";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";
import CreateBoardOverlay from "./CreateBoard.Overlay";
import Board from "./Board";

const CreateBoard = () => {
  const handleSave = e => {
    e.preventDefault();
  };

  return (
    <>
      <PageHeader header={"Create Board"} />
      <CreateBoardOverlay />
      <Board />
    </>
  );
};

export default connect()(CreateBoard);
