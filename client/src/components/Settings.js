import React from "react";
import { connect } from "react-redux";
import PageHeader from "./PageHeader";
import { updateUser, deleteUser } from "../actions/userActions";
import { Form as FinalForm, Field } from "react-final-form";
import {
  required,
  minLength,
  isEmail,
  composeValidators,
} from "../utils/formValidator";
import "../styles/Settings.scss";

const Settings = ({ updateUser, deleteUser, user, isFetching }) => {
  const userDetails = {
    oldEmail: user.email,
    id: user.id,
  };

  const handleEmailChange = async (values) => {
    // React final form handles e.preventDefault()
    const confirm = window.confirm(
      `Change email from ${userDetails.oldEmail} to ${values.newEmail}?`
    );
    if (confirm) {
      await updateUser({
        newEmail: values.newEmail,
        ...userDetails,
      });
    }
  };

  const handlePasswordChange = async (values) => {
    // React final form handles e.preventDefault()
    const { oldPassword, newPassword, checkPassword } = values;
    await updateUser({
      oldPassword,
      newPassword,
      checkPassword,
      ...userDetails,
    });
  };

  const handleDelete = async ({ password }) => {
    // React final form handles e.preventDefault()
    const confirm = window.confirm(`Delete ${userDetails.username}?`);
    if (confirm) {
      await deleteUser(password, user.id);
    }
  };

  return (
    <>
      <PageHeader header={"User Settings"} />
      <section className="flex-col-center">
        {isFetching ? null : (
          <>
            <div className="form-wrapper">
              <div className="form-header">
                <h1>Change Email</h1>
              </div>
              <div className="form-current-email">Current: {user.email}</div>
              <FinalForm
                onSubmit={handleEmailChange}
                render={({ handleSubmit, values }) => (
                  <form className="form-element" onSubmit={handleSubmit}>
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
                          <label className="mb12" htmlFor="email">
                            New email
                          </label>
                          <input
                            id="email"
                            className="form-control w100"
                            placeholder="new@email.com"
                            type="email"
                            autoComplete="on"
                            {...input}
                          />
                          <div className="form-error">
                            {meta.error && meta.touched && meta.error}
                          </div>
                        </div>
                      )}
                    </Field>
                    <div className="form-button-container">
                      <button
                        className="form-button login-button-primary"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>

            <div className="form-wrapper">
              <div className="form-header">
                <h1>Change Password</h1>
              </div>
              <div className="form-inner-container">
                <FinalForm
                  onSubmit={handlePasswordChange}
                  validate={(values) => {
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
                      <Field
                        name="oldPassword"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <label className="mb12" htmlFor="old-password">
                              Old password
                            </label>
                            <input
                              id="old-password"
                              className="form-control w100"
                              placeholder="Old Password"
                              type="password"
                              autoComplete="on"
                              {...input}
                            />
                            <div className="form-error">
                              {meta.error && meta.touched && meta.error}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field
                        name="newPassword"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <label className="mb12" htmlFor="new-password">
                              New password
                            </label>
                            <input
                              id="new-password"
                              className="form-control w100"
                              placeholder="New Password"
                              type="password"
                              autoComplete="on"
                              {...input}
                            />
                            <div className="form-error">
                              {meta.error && meta.touched && meta.error}
                            </div>
                          </div>
                        )}
                      </Field>
                      <Field name="checkPassword">
                        {({ input, meta }) => (
                          <div>
                            <label className="mb12" htmlFor="confirm-password">
                              Confirm new password
                            </label>
                            <input
                              id="confirm-password"
                              className="form-control w100"
                              placeholder="Confirm New Password"
                              type="password"
                              autoComplete="on"
                              {...input}
                            />
                            <div className="form-error">
                              {meta.error && meta.touched && meta.error}
                            </div>
                          </div>
                        )}
                      </Field>
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

            <div className="form-wrapper">
              <div className="form-header">
                <h1>Delete Account</h1>
              </div>
              <div className="form-inner-container">
                <FinalForm
                  onSubmit={handleDelete}
                  render={({ handleSubmit, values }) => (
                    <form className="form-element" onSubmit={handleSubmit}>
                      <Field
                        name="password"
                        validate={composeValidators(required, minLength(3))}
                      >
                        {({ input, meta }) => (
                          <div>
                            <label className="mb12" htmlFor="delete">
                              Password
                            </label>
                            <input
                              id="delete"
                              className="form-control w100"
                              placeholder="Password"
                              type="password"
                              autoComplete="on"
                              {...input}
                            />
                            <div className="form-error">
                              {meta.error && meta.touched && meta.error}
                            </div>
                          </div>
                        )}
                      </Field>
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    isFetching: state.nav.isFetching,
  };
};

const mapDispatchToProps = {
  updateUser,
  deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
