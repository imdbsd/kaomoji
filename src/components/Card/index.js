import React from 'react';
import KaomojiButton from '../../styles/KaomojiButton';

const Card = props => {
  const {emoji, source,} = props.emoji
  const { copyEmoji, pinEmojiAction, status} = props;
  const pinButton = () => {
    if(status === 'unpin'){
      const confirmUnpin = window.confirm('Unpin this emoji ?');
      if(!confirmUnpin){
        return null;
      }
    }
    return pinEmojiAction(props.emoji);
  }
  return(
    <div className="card">      
      <div className="card-content" style={{
        padding: 0
      }}>
        <KaomojiButton 
          className="button is-white is-large" 
          dangerouslySetInnerHTML={{__html: emoji}}
          onClick={() => copyEmoji(emoji)}
          ></KaomojiButton>        
      </div>      
      <footer className="card-footer">
        <a className="card-footer-item">detail</a>
        <a className="card-footer-item" onClick={pinButton}>{status}</a>
      </footer>
    </div>
  )
}

export default Card;
