import "../styles/CardEditor.css";

import React, { useState } from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const CardEditor = ({ cardText, onSave, onCancel, onDelete, adding }) => {
  const [text, setText] = useState(cardText || "");

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSave(text);
    }
  };

  return (
    <div className="Edit-Card">
      <div className="Card">
        <TextareaAutosize
          autoFocus
          className="Edit-Card-Textarea"
          placeholder="Enter the text for this card..."
          value={text}
          onChange={({ target }) => setText(target.value)}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default connect()(CardEditor);
