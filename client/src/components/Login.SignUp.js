import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions/userActions";

const LoginSignUp = ({ createUser }) => {
  const [form, setForm] = useState({});

  const formHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createUser(form);
  };

  return (
    <form className="flex-col-center form-element" onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={formHandler}
        placeholder="your@email.com"
        type="email"
        minLength={3}
        required
      />
      <input
        name="password"
        onChange={formHandler}
        placeholder="password"
        type="password"
        minLength={3}
        required
      />
      <input
        name="checkPassword"
        onChange={formHandler}
        placeholder="confirm password"
        type="password"
        minLength={3}
        required
      />
      <button className="w90 login-primary-btn" type="submit">
        sign up
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  createUser
};

export default connect(null, mapDispatchToProps)(LoginSignUp);
