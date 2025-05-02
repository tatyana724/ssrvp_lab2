import React, { useState } from 'react';

const Button = ({onPress}) => {
  return (
    <div>
      <button data-testid="i" onClick={onPress}>Increment</button>
    </div>
  );
};

export default Button;