import React from 'react';

const CopyNotification = ({ showNotif, message }) => (
  <div className={`notification is-success ${showNotif ? 'notif__up' : ''}`}>{message}</div>
);

const AlertNotification = ({ showNotif, message }) => (
  <div className={`notification is-danger ${showNotif ? 'notif__up' : ''}`}>{message}</div>
);

export { CopyNotification, AlertNotification };
