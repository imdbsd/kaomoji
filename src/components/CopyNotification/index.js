import React from 'react';

const CopyNotification = ({showNotif}) => {
  return (
    <div class={`notification is-success ${showNotif? 'notif__up' : ''}`}>      
      Coppied to clipboard
    </div>
  )
}

export default CopyNotification;
