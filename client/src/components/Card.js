import "../styles/Card.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { changeCardText, deleteCard } from "../actions/cardActions";

import CardEditor from "./CardEditor";

const Card = ({ listId, card, changeCardText, deleteCard }) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
    setText(card.cardText);
  };

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

  const editCard = (text) => {
    endEditing();
    changeCardText(card._id, text);
  };

  const handleDeleteCard = () => {
    deleteCard(card._id, listId);
  };

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={card.cardIndex}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="Card"
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {hover && (
              <div className="Card-Icons">
                <div className="Card-Icon" onClick={startEditing}>
                  <ion-icon name="create" />
                </div>
              </div>
            )}

            {card.cardText}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <CardEditor
        cardText={card.cardText}
        onSave={editCard}
        onDelete={handleDeleteCard}
        onCancel={endEditing}
        listId={listId}
      />
    );
  }
};

// const mapStateToProps = (state, ownProps) => ({
//   card: state.cards[ownProps.cardId],
// });

const mapDispatchToProps = {
  changeCardText,
  deleteCard,
};

export default connect(null, mapDispatchToProps)(Card);
