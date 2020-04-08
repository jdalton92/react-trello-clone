import React, { useState } from "react";
import { connect } from "react-redux";
import { addList } from "../actions/listActions";
import ListEditor from "./ListEditor";
import EditButtons from "./EditButtons";
import "../styles/AddList.css";

const AddList = ({ toggleAddingList, addList, boardId }) => {
  const [listTitle, setListTitle] = useState("");

  const handleChangeTitle = (e) => setListTitle(e.target.value);

  const createList = () => {
    toggleAddingList();
    addList(listTitle, boardId);
  };

  return (
    <div className="Add-List-Editor">
      <ListEditor
        title={listTitle}
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
  addList,
};

export default connect(null, mapDispatchToProps)(AddList);
