import React, { Component } from 'react';
import HeaderStyle from '../../styles/Header';

class Header extends Component {
  render() {
    return (
      <HeaderStyle className="navbar is-fixed-top is-dark" role="navigation" aria-label="main navigation">
        Kaomoji
      </HeaderStyle>
    );
  }
}

export default Header;
