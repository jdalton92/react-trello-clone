import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";
import { initBoards, deleteBoard } from "../actions/boardActions";
import { setNotification } from "../actions/notificationActions";
import "../styles/Boards.scss";
import { setFetching } from "../actions/navActions";

const Boards = ({
  setNotification,
  initBoards,
  boards,
  deleteBoard,
  setFetching,
  isFetching,
}) => {
  const history = useHistory();

  useState(() => {
    setFetching(true);
    initBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

  const handleView = (id) => {
    setFetching(true);
    history.push(`/board/${id}`);
  };

  const handleDelete = (id, boardName) => {
    const confirm = window.confirm(`Delete ${boardName}?`);
    if (confirm) {
      deleteBoard(id);
      setNotification({
        type: "success",
        message: `${boardName} deleted`,
      });
    }
  };

  return (
    <>
      <PageHeader header={"Boards"} />
      {isFetching ? null : (
        <section className="h100 w100 flex-col boards-wrapper">
          {boards.length === 0 && <div>no saved boards</div>}
          {boards.length > 0 && (
            <table className="w90 boards-table">
              <thead>
                <tr>
                  <th>Ref</th>
                  <th>Board Name</th>
                  <th>Description</th>
                  <th>Last Modified</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {boards.map((b, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{b.boardName}</td>
                    <td>{b.boardDescription}</td>
                    <td>
                      {new Intl.DateTimeFormat("en-GB").format(b.lastModified)}
                    </td>
                    <td>
                      <div
                        className="boards-table-action view-action"
                        onClick={() => handleView(b._id)}
                      >
                        View
                      </div>
                      <div
                        className="boards-table-action delete-action"
                        onClick={() => handleDelete(b._id, b.boardName)}
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boards,
  isFetching: state.nav.isFetching,
});

const mapDispatchToProps = {
  setNotification,
  initBoards,
  deleteBoard,
  setFetching,
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
