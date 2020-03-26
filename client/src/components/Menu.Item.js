import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../actions/userActions";
import { setHeader } from "../actions/navActions";

const MenuItem = ({ shrink, name, logoutUser, setHeader }) => {
  const history = useHistory();

  const nameParse = name.replace(/\s+/g, "-").toLowerCase();

  let tooltipProps = null;
  if (shrink) {
    tooltipProps = {
      "aria-label": name,
      "data-balloon-pos": "right"
    };
  }

  const handleClick = e => {
    e.preventDefault();
    console.log(name.toLowerCase().includes("boards"));

    if (name.toLowerCase().includes("boards")) {
      history.push("/");
      setHeader("Boards");
      return;
    } else if (name.toLowerCase().includes("settings")) {
      history.push("/settings");
      setHeader("Settings");
      return;
    } else if (name.toLowerCase().includes("logout")) {
      logoutUser();
      history.push("/");
      setHeader("Boards");
      return;
    }

    const win = window.open(
      "https://github.com/jdalton92/react-trello-clone",
      "_blank"
    );
    if (win != null) {
      win.focus();
    }
  };

  return (
    <>
      <div
        className="w100 flex-row menu-item"
        {...tooltipProps}
        onClick={handleClick}
      >
        <div
          className={`${shrink ? "hide" : "flex-2 flex-row-center menu-text"}`}
        >
          {name}
        </div>
        <div className="flex-1 flex-row icon-container">
          <div
            className={`${
              shrink ? "shrink-icon" : ""
            } menu-icon ${nameParse}-icon`}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  shrink: state.nav.menuShrink
});

const mapDispatchToProps = {
  logoutUser,
  setHeader
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
