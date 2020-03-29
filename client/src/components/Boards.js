import React from "react";
import { connect } from "react-redux";
import { setNotification } from "../actions/notificationActions";
import "../styles/Boards.scss";

const Boards = ({ setNotification }) => {
  const boards = ["board-1", "board-2"];

  const handleView = e => {
    e.preventDefault();
    setNotification({
      type: "success",
      message: "test"
    });
  };

  const handleDelete = e => {
    e.preventDefault();
    const confirm = window.confirm("Delete?");
    if (confirm) {
      setNotification({
        type: "success",
        message: "deleted"
      });
    }
  };

  return (
    <section className="h100 w100 flex-col boards-wrapper">
      <table className="w80 boards-table">
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
              <td>Ref</td>
              <td>Board Name</td>
              <td>Description</td>
              <td>Last Modified</td>
              <td>
                <div
                  className="boards-table-action view-action"
                  onClick={handleView}
                >
                  View
                </div>
                <div
                  className="boards-table-action delete-action"
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const mapStateToProps = state => ({
  board: state.board
});

const mapDispatchToProps = {
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
