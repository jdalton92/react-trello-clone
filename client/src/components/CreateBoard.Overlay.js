import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBoardModal } from "../actions/navActions";

const CreateBoardOverlay = ({ modal, setBoardModal }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(boardName, boardDescription);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setBoardModal(false);
    history.push("/");
  };

  return (
    <>
      {modal ? (
        <div className="overlay">
          <div className="modal">
            <form
              className="content flex-col board-name-form"
              onSubmit={handleSubmit}
            >
              <input
                placeholder="Board Name"
                type="text"
                maxLength={100}
                name="boardName"
                onChange={({ target }) => setBoardName(target.value)}
                required
              />
              <input
                placeholder="Board Description"
                type="text"
                maxLength={100}
                name="boardDescription"
                onChange={({ target }) => setBoardDescription(target.value)}
                required
              />
              <div>
                <button className="login-primary-btn" type="submit">
                  create
                </button>
                <button
                  className="login-secondary-btn"
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
});

const mapDispatchToProps = {
  setBoardModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBoardOverlay);
