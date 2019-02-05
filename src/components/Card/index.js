import React from 'react';
import { Link } from "react-router-dom";
import KaomojiButton from '../../styles/KaomojiButton';

const Card = props => {
  const { emoji } = props.emoji
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
            from: 'pinned',
            current: props.current
          }
          }} className="card-footer-item">detail</Link>
        <button className="card-footer-item" onClick={pinButton} style={{border: 'none', backgroundColor: 'white', color: '#3273dc'}}>{status}</button>
      </footer>
    </div>
  )
}

export default Card;
