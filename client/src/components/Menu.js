import React, { useState } from "react";
import { StyledPointer } from "../styles/StyledComponents";
import { connect } from "react-redux";
import MenuItem from "./Menu.Item";
import "../styles/Menu.scss";

const Menu = () => {
  const [shrink, setShrink] = useState(false);

  return (
    <div
      className={`menu-section flex-col-center ${
        shrink ? "shrink" : "expanded"
      }`}
    >
      <div className="flex-col-center flex-1">
        <StyledPointer shrink={shrink} onClick={() => setShrink(!shrink)}>
          <div />
          <div />
        </StyledPointer>
      </div>
      <div className="flex-col flex-4">
        <MenuItem shrink={shrink} name={"User"} />
        <MenuItem shrink={shrink} name={"Boards"} />
        <MenuItem shrink={shrink} name={"User Settings"} />
        <MenuItem shrink={shrink} name={"GitHub"} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  undefined
});

const mapDispatchToProps = {
  undefined
};

export default connect()(Menu);
