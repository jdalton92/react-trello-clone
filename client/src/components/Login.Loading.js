import React from "react";
import { connect } from "react-redux";

const LoginLoading = () => (
  <div className="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default connect()(LoginLoading);
