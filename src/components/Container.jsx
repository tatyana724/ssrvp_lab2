import React, {Children} from 'react';

// Компонент контейнера
const Container = ({ children, style }) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        ...style
      }}
    >
      {children} {}
    </div>
  );
};

export default Container;
