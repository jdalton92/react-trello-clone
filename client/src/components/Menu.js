import React from "react";
import { StyledPointer } from "../styles/StyledComponents";
import { connect } from "react-redux";
import MenuItem from "./Menu.Item";
import { toggleMenu } from "../actions/navActions";
import "../styles/Menu.scss";

const Menu = ({ shrink, toggleMenu }) => {
  return (
    <div className="menu-section flex-col-center">
      <div className="styled-pointer-wrapper">
        <StyledPointer shrink={shrink} onClick={() => toggleMenu()}>
          <div />
          <div />
        </StyledPointer>
      </div>
      <div className="w100 flex-col">
        <MenuItem name={"Saved Boards"} link={"/"} />
        <MenuItem name={"Create Board"} link={"/create"} />
        <MenuItem name={"User Settings"} link={"/settings"} />
        <MenuItem name={"GitHub"} />
        <MenuItem name={"Logout"} link={"/"} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shrink: state.nav.menuShrink,
});

const mapDispatchToProps = {
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
