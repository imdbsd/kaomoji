import React from "react";
import { Link } from "react-router-dom";
import HeaderStyle from "../../styles/Header";

const Header = props => (
  <HeaderStyle
    className="navbar is-fixed-top is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <Link to="/">Kaomoji</Link>
  </HeaderStyle>
);

export default Header;
