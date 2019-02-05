import React from "react";
import { Link } from "react-router-dom";
import HeaderStyle from "../../styles/Header";
import { ReactComponent as LeftArrow } from '../Icons/left-arrow.svg';

const Header = props => (
  <HeaderStyle
    className="navbar is-fixed-top is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    { props.pathname !== '/' && <Link to={{pathname: '/', state: { current: props.current }}} style={{position: 'absolute', left: '0px', top: '13px'}}><LeftArrow /></Link> }
    <Link to="/">Kaomoji</Link>
  </HeaderStyle>
);

export default Header;
