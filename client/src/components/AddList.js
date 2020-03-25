import React, { useState } from "react";
import { connect } from "react-redux";
import { addList } from "../actions/listActions";
import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import "../styles/AddList.css";

const AddList = ({ toggleAddingList, addList }) => {
  const [title, setTitle] = useState("");

  const handleChangeTitle = e => setTitle(e.target.value);

  const createList = () => {
    toggleAddingList();
    addList(title);
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};

const mapDispatchToProps = {
  addList
};

export default connect(null, mapDispatchToProps)(AddList);
