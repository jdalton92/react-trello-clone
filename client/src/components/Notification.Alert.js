import React, { useState } from "react";
import { connect } from "react-redux";
import { clearNotification } from "../actions/notificationActions";

const NotificationAlert = ({ notification, clearNotification }) => {
  const [animate, setAnimate] = useState(false);
  const { message, type, id } = notification;

  const handleClose = e => {
    e.preventDefault();
    setAnimate(true);
    setTimeout(() => clearNotification(id), 250);
  };

  return (
    <div
      className={`flex-col-center p10 notification-alert-wrapper ${
        animate ? "notification-alert-close" : ""
      }`}
    >
      <div className="flex-row w100 notification-subheader-wrapper">
        <div className={`notification-${type} flex-9 notification-subheader`}>
          {type}
        </div>
        <div
          className="flex-1 flex-row notification-close"
          onClick={handleClose}
        >
          x
        </div>
      </div>
      <div className="w100 notification-message">{message}</div>
    </div>
  );
};

const mapDispatchToProps = {
  clearNotification
};

export default connect(null, mapDispatchToProps)(NotificationAlert);
