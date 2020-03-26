import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser, updateUser, deleteUser } from "../actions/userActions";
// import { setNotification } from "../reducers/notificationReducer";
import { Form as FinalForm, Field } from "react-final-form";
import {
  required,
  minLength,
  isEmail,
  composeValidators
} from "../utils/formValidator";
import "../styles/Settings.scss";

const Settings = props => {
  const [form, setForm] = useState({});

  const formHandler = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const userDetails = {
    username: props.user.data.username,
    oldEmail: props.user.data.email,
    id: props.user.data.id
  };

  const handleEmailChange = async values => {
    // React final form handles e.preventDefault()
    const confirm = window.confirm(
      `Change email from ${userDetails.oldEmail} to ${values.newEmail}?`
    );
    if (confirm) {
      await props.updateUser({
        newEmail: values.newEmail,
        ...userDetails
      });
    }
  };

  const handlePasswordChange = async values => {
    // React final form handles e.preventDefault()
    const { oldPassword, newPassword, checkPassword } = values;
    await props.updateUser({
      oldPassword,
      newPassword,
      checkPassword,
      ...userDetails
    });
  };

  const handleDelete = async ({ password }) => {
    // React final form handles e.preventDefault()
    const confirm = window.confirm(`Delete ${userDetails.username}?`);
    if (confirm) {
      await props.deleteUser(password, props.user.id);
    }
  };

  return (
    <section className="form-section" id="create-form-section">
      {props.user.isFetching ? null : (
        <>
          <div className="form-outer-container form-card-container">
            <div className="form-header">
              <h1>Change Email</h1>
            </div>
            <div className="form-inner-container">
              <div className="form-item">
                <h5>Existing Email</h5>
                <div className="form-control" id="existing-email">
                  {props.user.data.email}
                </div>
              </div>
              <FinalForm
                onSubmit={handleEmailChange}
                render={({ handleSubmit, values }) => (
                  <form className="form-element" onSubmit={handleSubmit}>
                    <div className="form-item">
                      <h5>New Email</h5>
                      <Field
                        name="newEmail"
                        validate={composeValidators(
                          required,
                          minLength(3),
                          isEmail
                        )}
                      >
                        {({ input, meta }) => (
                          <div>
                            <input
                              className="form-control"
                              placeholder="new@email.com"
                              type="email"
                              {...input}
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="form-button-container">
                      <button
                        className="form-button"
                        type="submit"
                        variant="primary"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
          <div className="form-outer-container form-card-container">
            <div className="form-header">
              <h1>Change Password</h1>
            </div>
            <div className="form-inner-container">
              <FinalForm
                onSubmit={handlePasswordChange}
                validate={values => {
                  const errors = {};
                  if (!values.checkPassword) {
                    errors.checkPassword = "Required";
                  }
                  if (values.newPassword !== values.checkPassword) {
                    errors.checkPassword = "Passwords must match";
                  }
                  return errors;
                }}
                render={({ handleSubmit, values }) => (
                  <form className="form-element" onSubmit={handleSubmit}>
                    <div className="form-item">
                      <h5>Old Password</h5>
                      <Field
                        name="oldPassword"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <input
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              {...input}
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="form-item">
                      <h5>New Password</h5>
                      <Field
                        name="newPassword"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <input
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              {...input}
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="form-item">
                      <h5>Confirm New Password</h5>
                      <Field name="checkPassword">
                        {({ input, meta }) => (
                          <div>
                            <input
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              {...input}
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="form-button-container">
                      <button className="form-button" type="submit">
                        Update
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
          <div className="form-outer-container form-card-container">
            <div className="form-header">
              <h1>Delete Account</h1>
            </div>
            <div className="form-inner-container">
              <FinalForm
                onSubmit={handleDelete}
                render={({ handleSubmit, values }) => (
                  <form className="form-element" onSubmit={handleSubmit}>
                    <div className="form-item">
                      <h5>Password</h5>
                      <Field
                        name="password"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <input
                              className="form-control"
                              placeholder="Password"
                              type="password"
                              {...input}
                            />
                            {meta.error && meta.touched && (
                              <span className="form-error">{meta.error}</span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                    <div className="form-button-container">
                      <button className="form-button" type="submit">
                        Delete
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  createUser,
  updateUser,
  deleteUser
  //   setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
