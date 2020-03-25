import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import { initUser } from "./actions/userActions";
import Home from "./components/Home";
import Login from "./components/Login";
import Board from "./components/Board";
import "./styles/App.scss";

const App = props => {
  // useEffect(() => {
  //   props.initUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Router>
      {props.user ? (
        <>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/:id" render={() => <Board />} />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.data.username
  };
};

const mapDispatchToProps = {
  initUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
