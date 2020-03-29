import React from "react";
import { connect } from "react-redux";
import { setLogin } from "../actions/navActions";
import LoginLoading from "./Login.Loading";
import LoginLanding from "./Login.Landing";
import LoginSignUp from "./Login.SignUp";
import LoginLogin from "./Login.Login";
import "../styles/Login.scss";

const Login = ({ setLogin, loginView, isFetching, user }) => {
  const handleClick = e => {
    e.preventDefault();
    const win = window.open("https://jamesdalton.io", "_blank");
    if (win != null) {
      win.focus();
    }
  };

  const BackButton = () => (
    <button
      className="w90 login-secondary-btn"
      onClick={() => setLogin("landing")}
    >
      back
    </button>
  );

  return (
    <section className="w100 login-section flex-row">
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
          {isFetching ? (
            <LoginLoading />
          ) : (
            <>
              {loginView === "landing" && <LoginLanding />}
              {loginView === "signUp" && <LoginSignUp />}
              {loginView === "login" && <LoginLogin />}
              {loginView !== "landing" && <BackButton />}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  loginView: state.nav.loginView,
  isFetching: state.nav.isFetching,
  user: state.user
});

const mapDispatchToProps = {
  setLogin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
