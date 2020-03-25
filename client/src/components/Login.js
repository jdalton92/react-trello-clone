import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";
import loginIcon from "../styles/images/login-icon.svg";
import "../styles/Login.scss";

const Login = () => {
  const handleClick = e => {
    e.preventDefault();
    const win = window.open("https://jamesdalton.io", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  const handleSignUp = e => {
    e.preventDefault();
    console.log("sign up");
  };

  const handleLogin = e => {
    e.preventDefault();
    console.log("log in");
  };

  const handleTestFirst = e => {
    e.preventDefault();
    console.log("test first");
  };

  return (
    <section className="login-section flex-row">
      <div className="login-title-wrapper m10">
        <h2 className="login-title">react trello clone.</h2>
        <h4
          title="jamesdalton.io"
          className="login-subtitle"
          onClick={handleClick}
        >
          jamesdalton.io
        </h4>
      </div>
      <div className="h100 w100 login-image-full"></div>
      <div className="flex-row-center login-right">
        <div className="w100 flex-col-center login-card">
          <div className="flex-center login-icon-wrapper">
            <img
              className="img-cover w-auto login-icon"
              title="login-icon"
              alt="login-icon"
              src={loginIcon}
            />
          </div>
          <button className="w90 sign-up-btn" onClick={handleSignUp}>
            Sign Up
          </button>
          <button className="w90 login-btn" onClick={handleLogin}>
            Log In
          </button>
          <hr className="w90" />
          <button className="w90 test-btn" onClick={handleTestFirst}>
            I'd like to test first
          </button>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  boards: state.boards,
  boardOrder: state.boardOrder
});

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
