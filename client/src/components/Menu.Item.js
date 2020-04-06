import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../actions/userActions";
import { setBoardModal } from "../actions/navActions";

const MenuItem = ({ link, shrink, name, logoutUser, setBoardModal }) => {
  const history = useHistory();

  const nameParse = name.replace(/\s+/g, "-").toLowerCase();

  let tooltipProps = null;
  if (shrink) {
    tooltipProps = {
      "aria-label": name,
      "data-balloon-pos": "right",
    };
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (name.toLowerCase().includes("logout")) {
      logoutUser();
      history.push("/");
    } else if (name.toLowerCase().includes("github")) {
      const win = window.open(
        "https://github.com/jdalton92/react-trello-clone",
        "_blank"
      );
      if (win != null) {
        win.focus();
      }
    } else if (link === "/create") {
      setBoardModal(true);
      history.push(link);
    } else {
      history.push(link);
    }
    return;
  };

  return (
    <>
      <div
        className="w100 flex-col-center menu-item"
        {...tooltipProps}
        onClick={handleClick}
      >
        <div className="w100 flex-row-center icon-container">
          <div
            className={`${
              shrink ? "shrink-icon" : ""
            } menu-icon ${nameParse}-icon`}
          />
        </div>
        <div
          className={`${
            shrink ? "shrink" : "w100 flex-row-center menu-text-wrapper"
          }`}
        >
          <div className="menu-text">{name}</div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  shrink: state.nav.menuShrink,
});

const mapDispatchToProps = {
  logoutUser,
  setBoardModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
