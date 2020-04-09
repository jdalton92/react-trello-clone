import "../styles/Card.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { changeCardText, deleteCard } from "../actions/cardActions";

import CardEditor from "./CardEditor";

const Card = ({ listId, card, index, changeCardText, deleteCard }) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
    setText(card.text);
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
      <Draggable draggableId={card._id} index={index}>
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

            {card.text}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <CardEditor
        cardText={card.text}
        onSave={editCard}
        onDelete={handleDeleteCard}
        onCancel={endEditing}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  card: state.cards[ownProps.cardId],
});

const mapDispatchToProps = {
  changeCardText,
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
