import React, { useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Link, useParams } from "react-router-dom";
import List from "./List";
import AddList from "./AddList";
import { moveList } from "../actions/listActions";
import { moveCard } from "../actions/cardActions";
import "../styles/Board.scss";

const Board = ({ moveList, moveCard, board }) => {
  const boardID = useParams().id;
  console.log("boardID", boardID);
  // useEffect(() => {
  //   props.setActiveBoard(boardID);
  // }, []);

  const [addingList, setAddingList] = useState(false);

  const toggleAddingList = () => setAddingList(!addingList);

  const handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;

    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        moveList(source.index, destination.index);
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      moveCard(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }
  };

  return (
    <section className="h100 w100 board-section">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided, _snapshot) => (
            <div className="board" ref={provided.innerRef}>
              {board.lists.map((listId, index) => {
                return <List listId={listId} key={listId} index={index} />;
              })}

              {provided.placeholder}

              <div className="add-list">
                {addingList ? (
                  <AddList toggleAddingList={toggleAddingList} />
                ) : (
                  <div onClick={toggleAddingList} className="add-list-button">
                    <ion-icon name="add" /> Add a list
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

const mapStateToProps = state => ({
  board: state.board
});

const mapDispatchToProps = {
  moveList,
  moveCard
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
