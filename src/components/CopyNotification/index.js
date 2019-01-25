import React from 'react';

const CopyNotification = ({showNotif, selectedEmoji}) => {
  return (
    <div class={`notification is-success ${showNotif? 'notif__up' : ''}`}>      
      Coppied {selectedEmoji} to clipboard
    </div>
  )
}

export default CopyNotification;
