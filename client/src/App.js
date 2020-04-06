import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initUser } from "./actions/userActions";

import Notifications from "./components/Notifications";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Boards from "./components/Boards";
import CreateBoard from "./components/CreateBoard";
import ViewBoard from "./components/ViewBoard";
import Settings from "./components/Settings";

import "./styles/App.scss";

const App = ({ initUser, user, boards, lists, cards }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initUser();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("boards", boards);
  console.log("lists", lists);
  console.log("cards", cards);

  if (loading) {
    return (
      <section className="w100 h100 flex-col-center">
        <div className="m30 h100 lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div>loading...</div>
      </section>
    );
  } else {
    return (
      <>
        <div className="app-wrapper flex-row">
          <Router>
            <Switch>
              {user ? (
                <>
                  <Menu />
                  <Notifications />
                  <div className="h100 w100 flex-col page-wrapper">
                    <Route exact path="/" render={() => <Boards />} />
                    <Route
                      exact
                      path="/create"
                      render={() => <CreateBoard />}
                    />
                    <Route path="/board/:id" render={() => <ViewBoard />} />
                    <Route path="/settings" render={() => <Settings />} />
                  </div>
                </>
              ) : (
                <>
                  <Login />
                  <Notifications />
                </>
              )}
            </Switch>
          </Router>
        </div>
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    user: state.user,
    cards: state.cards,
    lists: state.lists
  };
};

const mapDispatchToProps = {
  initUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
