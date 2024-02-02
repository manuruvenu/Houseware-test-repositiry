import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from '../TodoApp';

test('renders TodoApp component', () => {
  const { getByText } = render(<TodoApp />);
  const header = getByText('todos');
  expect(header).toBeInTheDocument();
});

test('adds a new todo through the input field', () => {
  const { getByTestId } = render(<TodoApp />);
  const input = getByTestId('todo-input');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
  const newTodo = getByTestId('todo-1');
  expect(newTodo).toBeInTheDocument();
});

test('marks a todo as complete and updates completed todos count', () => {
  const { getByTestId, getByText } = render(<TodoApp />);
  const input = getByTestId('todo-input');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
  const completeButton = getByTestId('complete-button-1');
  fireEvent.click(completeButton);
  const completedCount = getByText('1 item left');
  expect(completedCount).toBeInTheDocument();
});