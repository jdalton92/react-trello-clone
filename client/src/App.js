import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initUser } from "./actions/userActions";

import Notifications from "./components/Notifications";
import Login from "./components/Login";
import Menu from "./components/Menu";
import PageHeader from "./components/PageHeader";
import Boards from "./components/Boards";
import Board from "./components/Board";
import Settings from "./components/Settings";

import "./styles/App.scss";

const App = props => {
  // useEffect(() => {
  //   props.initUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <div className="app-wrapper flex-row">
        <Router>
          <Switch>
            {props.user ? (
              <>
                <Menu />
                <div className="h100 w100 flex-col page-wrapper">
                  <PageHeader />
                  <Notifications />
                  <Route exact path="/" render={() => <Boards />} />
                  <Route path="/board/:id" render={() => <Board />} />
                  <Route path="/settings" render={() => <Settings />} />
                </div>
              </>
            ) : (
              <>
                <Login />
              </>
            )}
          </Switch>
        </Router>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  initUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
