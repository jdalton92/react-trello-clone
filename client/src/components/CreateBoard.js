import React from "react";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";

import Board from "./Board";

const CreateBoard = ({ board }) => {
  return (
    <>
      <PageHeader header={"Create Board"} />
      <CreateBoardOverlay />
      {Object.keys(board).length !== 0 && <Board />}
    </>
  );
};

const mapStateToProps = (state) => ({
  board: state.boards.activeBoard,
});

export default connect(mapStateToProps)(CreateBoard);
