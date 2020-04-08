import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import PageHeader from "./PageHeader";
import List from "./List";
import AddList from "./AddList";
import { getBoard } from "../actions/boardActions";
import { moveList } from "../actions/listActions";
import { moveCard } from "../actions/cardActions";
import "../styles/Board.scss";

const Board = ({ moveList, moveCard, getBoard, lists, isFetching }) => {
  const boardId = useParams().id;
  useEffect(() => {
    getBoard(boardId);
  }, []);

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
    <>
      <PageHeader header={"Board"} />
      {isFetching ? (
        <div>loading...</div>
      ) : (
        <section className="h100 w100 board-section">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="COLUMN">
              {(provided, _snapshot) => (
                <div className="board" ref={provided.innerRef}>
                  {lists.map((l, i) => {
                    return <List list={l} key={l._id} index={i} />;
                  })}

                  {provided.placeholder}

                  <div className="add-list">
                    {addingList ? (
                      <AddList
                        toggleAddingList={toggleAddingList}
                        boardId={boardId}
                      />
                    ) : (
                      <div
                        onClick={toggleAddingList}
                        className="add-list-button"
                      >
                        <ion-icon name="add" /> Add a list
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  lists: state.lists,
  isFetching: state.nav.isFetching,
});

const mapDispatchToProps = {
  moveList,
  moveCard,
  getBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
