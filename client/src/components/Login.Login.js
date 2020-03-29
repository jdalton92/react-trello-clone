import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";
import { setNotification } from "../actions/notificationActions";

const LoginLogin = ({ loginUser }) => {
  const [form, setForm] = useState({});

  const formHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginUser(form);
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
      <button className="w90 login-primary-btn" type="submit">
        log in
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  loginUser
};

export default connect(null, mapDispatchToProps)(LoginLogin);
