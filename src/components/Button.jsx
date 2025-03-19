import React, {Children} from 'react';

// Компонент кнопки
const Button = ({ onClick, label, disabled = false }) => {
  return (
    <button
      onClick={onClick} // Обработчик клика
      disabled={disabled} // Состояние кнопки (активна/неактивна)
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        color: '#fff',
        border: 'none',
      }}
    >
      {label}
    </button>
  );
};

export default Button