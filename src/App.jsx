//import React from 'react';
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, useTheme } from './ThemeContext';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './App.css';
import Container from './components/Container';
import Button from './components/Button';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Content from './components/Content';
import store from './store';
import Feedback from './components/Feedback';


const labs = [
  { title: 'lab1', content: 'Contents of Lab1.' },
  { title: 'lab2', content: 'Contents of Lab2.' },
  { title: 'lab3', content: 'Contents of Lab3.' },
];

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <ThemedApp />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

function ThemedApp() {
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const currentLabTitle = location.pathname.substring(1) || 'lab1';
  const selectedLab = labs.find(lab => lab.title === currentLabTitle) || labs[0];

  const count = useSelector((state) => state.count);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Компонент смонтирован");
    return () => {
      console.log("Компонент размонтирован");
    };
  }, []);

  const handleLogout = () => {
    
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div style={{ backgroundColor: isDarkTheme ? '#333' : '#FFF', color: isDarkTheme ? '#FFF' : '#000', minHeight: '100vh' }}>
      <Navigation />
      <h1>Hello World</h1>

      <button onClick={toggleTheme}>
        Переключить тему
      </button>

      <AuthForms />
      <br />

      {isAuthenticated && (
        <div style={{ textAlign: 'right', margin: '10px' }}>
          <span style={{ marginRight: '10px' }}>Пользователь: [Имя пользователя]</span>
          <Button label="Logout" onClick={handleLogout} />
        </div>
      )}

      <Container style={{ backgroundColor: '#342e57', boxShadow: '0 10px 60px rgba(52, 46, 87)', marginBottom: '50px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2>Counter: {count}</h2>
          <Button label="Increase" onClick={() => dispatch({ type: 'INCREMENT' })} />
          <Button label="Decrease" onClick={() => dispatch({ type: 'DECREMENT' })} />
        </div>
      </Container>

      <Header />
      <Container>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '200px', marginRight: '20px' }}>
            <Menu labs={labs} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <Routes>
              {labs.map(lab => (
                <Route key={lab.title} path={`/${lab.title}`} element={<Content lab={lab} />} />
              ))}
              <Route path="/" element={<Content lab={selectedLab} />} />
            </Routes>
          </div>
        </div>
      </Container>

      <Feedback />
      <Footer />
    </div>
  );
}


function AuthForms() {
  return (
    <div>
      <h2>Authorization form</h2>
      <LoginForm />
      <h2>Registration form</h2>
      <RegisterForm />
    </div>
  );
}

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    axios.post('http://localhost:3000/api/auth', data)
      .then(response => {
        alert('Успешная авторизация');
      })
      .catch(error => {
        console.error('Ошибка запроса:', error.response ? error.response.data : error.message);
        alert('Ошибка авторизации');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email required' })} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <br /> {}
      <input {...register('password', { required: 'password required' })} type="password" placeholder="Пароль" />
      {errors.password && <span>{errors.password.message}</span>}
      <br /> {}<br /> {}
      <Button label="login to account" type="submit" />
    </form>
  );
}

function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const onSubmit = data => {
    axios.post('http://localhost:3000/api/register', data)
      .then(response => {
        alert('Успешная регистрация');
      })
      .catch(error => {
        console.error(error);
        alert('Ошибка регистрации');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username', { required: 'Username required' })} placeholder="Username" />
      {errors.username && <span>{errors.username.message}</span>}
      <br /> {}
      <input {...register('email', { required: 'Email required' })} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      <br /> {}
      <input {...register('password', { required: 'password required' })} type="password" placeholder="Пароль" />
      {errors.password && <span>{errors.password.message}</span>}
      <br /> {}<br /> {}
      <Button label="Register" type="submit" />
    </form>
  );  
}

function FeedbackForm() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    axios.post('http://localhost:3000/api/feedback', data)
      .then(response => {
        alert('Отзыв отправлен');
        reset();
      })
      .catch(error => {
        console.error(error);
        alert('Ошибка отправки отзыва');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('text', { required: 'Отзыв необходим' })} placeholder="Ваш отзыв" />
      <button type="submit">Отправить отзыв</button>
    </form>
  );
}

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    axios.get('http://localhost:3000/api/feedback')
      .then(response => {
        setFeedbacks(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteFeedback = id => {
    axios.delete(`http://localhost:3000/api/feedback/${id}`)
      .then(response => {
        alert('Отзыв удален');
        loadFeedbacks();
      })
      .catch(error => {
        console.error(error);
        alert('Ошибка удаления отзыва');
      });
  };

  return (
    <div>
      {feedbacks.map(feedback => (
        <div key={feedback.id}>
          <p>{feedback.text}</p>
          
          <button onClick={() => deleteFeedback(feedback.id)}>Удалить отзыв</button>
        </div>
      ))}
    </div>
  );
}

export default App;

