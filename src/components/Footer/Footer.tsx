import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../../Context/ThemeContext';
import { Link } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return (
    <footer className={`py-3 ${theme === "dark" ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      <Container className="d-flex justify-content-between align-items-center">
      <Link to="/" className="btn btn-primary">
          Отзывы
        </Link>
        
        <div className="d-flex align-items-center bg-secondary bg-opacity-10 p-1 rounded">
          <button 
            onClick={decrement}
            className={`btn btn-sm ${theme === "dark" ? 'btn-outline-light' : 'btn-outline-dark'} mx-1`}
          >
            -
          </button>
          <span className="mx-2 fw-bold">{count}</span>
          <button 
            onClick={increment}
            className={`btn btn-sm ${theme === "dark" ? 'btn-outline-light' : 'btn-outline-dark'} mx-1`}
          >
            +
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;