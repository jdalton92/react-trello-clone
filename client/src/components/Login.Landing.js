import React from "react";
import loginIcon from "../styles/images/login-icon.svg";
import { connect } from "react-redux";
import { setLogin } from "../actions/navActions";

const LoginLanding = ({ setLogin }) => {
  const handleTestFirst = e => {
    e.preventDefault();
    console.log("test");
  };

  return (
    <>
      <div className="flex-col-center login-icon-wrapper">
        <img
          className="img-cover w-auto h100"
          title="login-icon"
          alt="login-icon"
          src={loginIcon}
        />
      </div>
      <button
        className="w90 login-secondary-btn"
        onClick={() => setLogin("signUp")}
      >
        sign up
      </button>
      <button
        className="w90 login-primary-btn"
        onClick={() => setLogin("login")}
      >
        log In
      </button>
      <hr className="w90" />
      <button className="w90 login-alt-btn" onClick={handleTestFirst}>
        I'd like to test first
      </button>
    </>
  );
};

const mapDispatchToProps = {
  setLogin
};

export default connect(null, mapDispatchToProps)(LoginLanding);
