import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import "../styles/ListEditor.css";

const ListEditor = ({
  title,
  handleChangeTitle,
  deleteList,
  saveList,
  onClickOutside,
}) => {
  const ref = useRef();
  const handleClick = (e) => {
    if (ref.current?.contains(e.target)) {
      return;
    }
    onClickOutside();
  };
  useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  return (
    <div className="List-Title-Edit" ref={ref}>
      <TextareaAutosize
        autoFocus
        className="List-Title-Textarea"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <ion-icon name="trash" onClick={deleteList} />}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  list: state.lists[ownProps.listId],
});

// const mapDispatchToProps = {
//   TBC
// };

export default connect(mapStateToProps)(ListEditor);
