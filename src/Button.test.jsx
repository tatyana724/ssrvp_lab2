import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Обновленный импорт
import Button from './MyButton';

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button />);
    const button = screen.getByTestId('i');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Increment');
  });

  test('handles clicks', () => {
    const mockFn = jest.fn();
    render(<Button onPress={mockFn} />);
    fireEvent.click(screen.getByTestId('i'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});