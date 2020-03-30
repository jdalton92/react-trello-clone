import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "../actions/userActions";

const MenuItem = ({ link, shrink, name, logoutUser }) => {
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
    } else {
      history.push(link);
    }
    return;
  };

  return (
    <>
      <div
        className="w100 flex-row menu-item"
        {...tooltipProps}
        onClick={handleClick}
      >
        <div
          className={`${
            shrink ? "shrink" : "flex-2 flex-row-center menu-text-wrapper"
          }`}
        >
          <div className="menu-text">{name}</div>
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
  logoutUser
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
