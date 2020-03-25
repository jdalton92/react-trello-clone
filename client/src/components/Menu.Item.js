import React from "react";
import { connect } from "react-redux";

const MenuItem = ({ shrink, name }) => {
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
    console.log("name", nameParse);
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

export default connect()(MenuItem);
