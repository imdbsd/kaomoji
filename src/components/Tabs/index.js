import React from 'react';

const Tabs = props => {
  const { filter, changeFilter } = props;
  return (
    <div className="tabs is-toggle is-centered is-fullwidth" style={{margin: "20px auto 10px"}}>
      <ul>
        <li className={filter === 'all' ? 'is-active' : ''}>
          <a href="#" onClick={() => changeFilter('all')}>
            <span>All Kaomojis</span>
          </a>
        </li>        
        <li className={filter === 'pinned' ? 'is-active' : ''}>
          <a href="#" onClick={() => changeFilter('pinned')}>            
            <span>Pinned</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Tabs;
