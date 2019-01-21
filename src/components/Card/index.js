import React from 'react';
import KaomojiButton from '../../styles/KaomojiButton';

const Card = props => {
  const {emoji, source} = props.emoji
  return(
    <div className="card">      
      <div className="card-content" style={{
        padding: 0
      }}>
        <KaomojiButton className="button is-white is-large" dangerouslySetInnerHTML={{__html: emoji}}></KaomojiButton>        
      </div>      
      <footer class="card-footer">
        <a href="#" className="card-footer-item">detail</a>
      </footer>
    </div>
  )
}

export default Card;
