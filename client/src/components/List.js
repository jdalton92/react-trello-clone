import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { addCard } from "../actions/cardActions";
import { changeListTitle, deleteList } from "../actions/listActions";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import "../styles/List.css";

const List = ({
  list,
  cards,
  index,
  addCard,
  changeListTitle,
  deleteList,
  isFetching,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.listTitle);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const handleAddCard = (cardText) => {
    toggleAddingCard();
    addCard(cardText, list._id);
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = () => {
    toggleEditingTitle();
    changeListTitle(list.board, list._id, title);
  };

  const handleDeleteList = () => {
    deleteList(list._id);
  };

  if (isFetching) {
    return null;
  }
  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="List"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={handleDeleteList}
            />
          ) : (
            <div className="List-Title" onClick={() => toggleEditingTitle()}>
              {list.listTitle}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {cards.length > 0 &&
                  cards.map((c, i) => (
                    <Card key={c._id} card={c} listId={list._id} />
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {addingCard ? (
            <CardEditor
              onSave={handleAddCard}
              onCancel={toggleAddingCard}
              listId={list._id}
              adding
            />
          ) : (
            <div className="Toggle-Add-Card" onClick={toggleAddingCard}>
              <ion-icon name="add" /> Add a card
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isFetching: state.nav.isFetching,
  cards: state.cards
    .filter((c) => c.list === ownProps.list._id)
    .sort((a, b) => a.cardIndex - b.cardIndex),
});

const mapDispatchToProps = {
  addCard,
  changeListTitle,
  deleteList,
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
