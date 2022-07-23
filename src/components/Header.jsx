import React from 'react';
import logo from '../static/image/bing-logo.png';

export default function Header() {
  return (
    <div className="header">
      <div className="header__img-wrapper">
        <img src={logo} />
      </div>
      <div className="header__search-bar">
        <input />
        <img className="header__search-bar__search-icon" src={'https://i.imgur.com/mO2D4Zy_d.webp?maxwidth=760&fidelity=grand'} />
      </div>
    </div>
  );
}
