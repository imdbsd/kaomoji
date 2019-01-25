import React from 'react';
import KaomojiButton from '../../styles/KaomojiButton';

const Card = props => {
  const {emoji, source} = props.emoji
  const { copyEmoji, pinEmoji} = props;
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
        <a href="#" className="card-footer-item">detail</a>
        <a href="#" className="card-footer-item" onClick={() => pinEmoji(props.emoji)}>pin</a>
      </footer>
    </div>
  )
}

export default Card;
