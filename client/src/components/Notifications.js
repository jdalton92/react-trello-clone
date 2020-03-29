import React from "react";
import { connect } from "react-redux";
import NotificationAlert from "./Notification.Alert";
import "../styles/Notifications.scss";

const Notifications = ({ notifications }) => {
  return (
    <div className="flex-col m10 notification-wrapper ">
      {notifications.length > 0
        ? notifications.map((n, i) => (
            <NotificationAlert key={i} notification={n} />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = state => ({
  notifications: state.notifications
});

export default connect(mapStateToProps, null)(Notifications);
