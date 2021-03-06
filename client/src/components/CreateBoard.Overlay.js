import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBoardModal } from "../actions/navActions";
import { addBoard } from "../actions/boardActions";
import "../styles/CreateBoard.Overlay.scss";

const CreateBoardOverlay = ({ modal, setBoardModal, addBoard }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard(boardName, boardDescription);
    setBoardModal(false);
    //Figure out better way to push to board
    history.push("/");
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
            <h2 className="mb24">Create Board</h2>
            <form
              className="content w100 h100 flex-col-center form-element"
              onSubmit={handleSubmit}
            >
              <label className="w100" htmlFor="name">
                Board Name
              </label>
              <input
                id="name"
                className="w100 createboard-input"
                placeholder="Board Name"
                type="text"
                maxLength={100}
                name="boardName"
                onChange={({ target }) => setBoardName(target.value)}
                autoComplete="off"
                required
              />
              <label className="w100" htmlFor="description">
                Board Description
              </label>
              <input
                id="description"
                className="w100 createboard-input"
                placeholder="Board Description"
                type="text"
                maxLength={100}
                name="boardDescription"
                onChange={({ target }) => setBoardDescription(target.value)}
                autoComplete="off"
                required
              />
              <div className="w100 flex-row">
                <button
                  className="flex-1 primary-btn create-new-board-btn"
                  type="submit"
                >
                  create
                </button>
                <button
                  className="flex-1 secondary-btn cancel-new-board-btn"
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
