import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useLoginState } from "../../hooks/useLoginState";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../Context/ThemeContext";
import labs from "./labsData"; // Импортируем данные о лабораторных
import "./Header.css";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { username, role } = useSelector((state) => ({
    username: state.user.username,
    role: state.user.role
  }));
  
  const isAuthenticated = useLoginState();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (showMenu) setSelectedLab(null);
  };

  const renderLabContent = (content) => {
    if (typeof content === 'string') {
      return <li key={content}>{content}</li>;
    }
    
    return Object.entries(content).map(([key, value]) => (
      <ul key={key}>
        {typeof value === 'string' ? (
          <li>{value}</li>
        ) : (
          renderLabContent(value)
        )}
      </ul>
    ));
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-container">
        <div className="nav-center">
          <Link to="/" className="nav-item">Главная</Link>
          <Link to="/about_me" className="nav-item">О себе</Link>
          <button onClick={toggleTheme} className="nav-item theme-toggle">
            {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
          </button>
          <button onClick={toggleMenu} className="nav-item menu-btn">
            Меню
          </button>
        </div>

        <div className="user-controls">
          {isAuthenticated && (
            <Link to="/profile" className="user-greeting">
              <span className="username">{username}</span>
            </Link>
          )}

          {role === "admin" && (
            <Link to="/admin/users" className="admin-link">
              Управление пользователями
            </Link>
          )}

          {isAuthenticated && (
            <button 
              onClick={() => dispatch({ type: "LOGOUT" })} 
              className="logout-btn"
            >
              Выйти
            </button>
          )}
        </div>
      </div>

      {showMenu && (
        <div className={`menu-dropdown ${theme}`} style={{
          backgroundColor: theme === "light" ? "#fff" : "#333", // Белый для светлой темы, темный для темной
        }}>
          {!selectedLab ? (
            <div className="labs-list">
              <h3>Лабораторные работы</h3>
              <ul>
                {labs.map((lab) => (
                  <li key={lab.id}>
                    <button 
                      onClick={() => setSelectedLab(lab)}
                      className="lab-link"
                    >
                      {lab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="lab-content">
              <button 
                onClick={() => setSelectedLab(null)}
                className="back-button"
              >
                ← Назад к списку
              </button>
              <h3>{selectedLab.title}</h3>
              {selectedLab.subtitle && <h4>{selectedLab.subtitle}</h4>}
              <ul>
                {renderLabContent(selectedLab.content)}
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;