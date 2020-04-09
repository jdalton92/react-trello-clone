import React from "react";
import { connect } from "react-redux";
import "../styles/PageHeader.scss";

const PageHeader = ({ header, isFetching }) => {
  return (
    <div className="w100 flex-row-center page-header-wrapper">
      {!isFetching ? null : (
        <>
          <div className="flex-row-center loading-wrapper">
            <div className="h100 lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="loading-text">loading...</div>
          </div>
        </>
      )}
      <h2 className="h100 m0 flex-row-center">{header}</h2>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.nav.isFetching,
});

export default connect(mapStateToProps)(PageHeader);
