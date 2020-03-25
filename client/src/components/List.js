import React, { useState } from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { addCard } from "../actions/cardActions";
import { changeListTitle, deleteList } from "../actions/listActions";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import shortid from "shortid";

import "../styles/List.css";

const List = ({
  list,
  index,
  listId,
  addCard,
  changeListTitle,
  deleteList
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const handleAddCard = cardText => {
    const cardId = shortid.generate();
    toggleAddingCard();
    addCard(cardText, cardId, listId);
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = e => setTitle(e.target.value);

  const editListTitle = () => {
    toggleEditingTitle();
    changeListTitle(listId, title);
  };

  const handleDeleteList = () => {
    deleteList(listId, list.cards);
  };

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
              {list.title}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {addingCard ? (
            <CardEditor
              onSave={handleAddCard}
              onCancel={toggleAddingCard}
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
  list: state.lists[ownProps.listId]
});

const mapDispatchToProps = {
  addCard,
  changeListTitle,
  deleteList
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
