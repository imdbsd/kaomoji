import React from 'react';
import { Link } from "react-router-dom";
import KaomojiButton from '../../styles/KaomojiButton';

const Card = props => {
  const {emoji, source,} = props.emoji
  const { copyEmoji, pinEmojiAction, status, filter} = props;
  const [parentCategory, subCategory] = props.category.split("-");
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
        <Link to={{
          pathname: `/${filter}/${parentCategory}/${subCategory}/${props.index}`,
          state: {
            from: 'pinned'
          }
          }} className="card-footer-item">detail</Link>
        <a className="card-footer-item" onClick={pinButton}>{status}</a>
      </footer>
    </div>
  )
}

export default Card;
