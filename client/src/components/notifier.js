import React, { useContext } from "react";
import NotificationContext from "./notification_context";

function Notifier() {
  const { notification } = useContext(NotificationContext);

  if (notification.status) {
    return (
      <div
        className={"alert alert-" + notification.status}
        style={{ marginTop: "1em " }}
      >
        {notification.message}
      </div>
    );
  }

  return null;
}

export default Notifier;
