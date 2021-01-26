import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";

const LoginLogin = ({ loginUser }) => {
  const [form, setForm] = useState({});

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(form);
  };

  return (
    <form className="flex-col-center form-element" onSubmit={handleSubmit}>
      <label className="w100" htmlFor="email">
        email
      </label>
      <input
        id="email"
        name="email"
        onChange={formHandler}
        placeholder="your@email.com"
        type="email"
        minLength={3}
        autoComplete="on"
        required
      />
      <label className="w100" htmlFor="password">
        password
      </label>
      <input
        id="password"
        name="password"
        onChange={formHandler}
        placeholder="password"
        type="password"
        minLength={3}
        autoComplete="on"
        required
      />
      <button className="w100 primary-btn" type="submit">
        log in
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(LoginLogin);
