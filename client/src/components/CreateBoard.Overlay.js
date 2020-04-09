import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBoardModal } from "../actions/navActions";
import { addBoard } from "../actions/boardActions";
import "../styles/CreateBoard.Overlay.scss";

const CreateBoardOverlay = ({ modal, setBoardModal, addBoard, board }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard(boardName, boardDescription);
    setBoardModal(false);
    // Figure out better way to push to board
    setTimeout(() => history.push(`board/${board._id}`), 3000);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setBoardModal(false);
  };

  return (
    <>
      {modal ? (
        <div className="overlay">
          <div className="modal">
            <h2>Create Board</h2>
            <form
              className="content w100 h80 flex-col-center form-element"
              onSubmit={handleSubmit}
            >
              <input
                className="w100 form-control"
                placeholder="Board Name"
                type="text"
                maxLength={100}
                name="boardName"
                onChange={({ target }) => setBoardName(target.value)}
                required
              />
              <input
                className="w100 form-control"
                placeholder="Board Description"
                type="text"
                maxLength={100}
                name="boardDescription"
                onChange={({ target }) => setBoardDescription(target.value)}
                required
              />
              <div className="w100 flex-row">
                <button
                  className="flex-1 login-primary-btn create-new-board-btn"
                  type="submit"
                >
                  create
                </button>
                <button
                  className="flex-1 login-secondary-btn cancel-new-board-btn"
                  type="button"
                  onClick={handleCancel}
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  modal: state.nav.showBoardModal,
  board: state.boards.activeBoard,
});

const mapDispatchToProps = {
  setBoardModal,
  addBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoardOverlay);
