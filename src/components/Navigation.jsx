import React, {Children} from 'react';
import './Navigation.css';

// Компонент контейнера
const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><a href="#home">home</a></li>
        <li><a href="#about">about us</a></li>
        <li><a href="#services">service</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
