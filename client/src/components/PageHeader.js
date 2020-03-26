import React from "react";
import { connect } from "react-redux";
import "../styles/PageHeader.scss";

const PageHeader = ({ header }) => {
  return (
    <div className="w100 flex-row-center page-header-wrapper">
      <div className="flex-row-center loading-wrapper">
        <div className="h100 lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <p className="h100 m0 flex-row-center">{header}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  header: state.nav.header
});

export default connect(mapStateToProps)(PageHeader);
