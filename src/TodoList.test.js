import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList from '../TodoList';

test('renders TodoList component with a list of todos', () => {
  const todos = [
    { id: 1, text: 'Test Todo 1', completed: false },
    { id: 2, text: 'Test Todo 2', completed: true },
  ];
  const { getByText } = render(<TodoList todos={todos} />);
  const todo1 = getByText('Test Todo 1');
  const todo2 = getByText('Test Todo 2');
  expect(todo1).toBeInTheDocument();
  expect(todo2).toBeInTheDocument();
});

test('adds a new todo to the list', () => {
  const mockAddHandler = jest.fn();
  const { getByTestId } = render(<TodoList onAdd={mockAddHandler} />);
  const input = getByTestId('todo-input');
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });
  expect(mockAddHandler).toHaveBeenCalledWith('New Todo');
});

test('removes a todo from the list', () => {
  const todos = [{ id: 1, text: 'Test Todo', completed: false }];
  const mockDeleteHandler = jest.fn();
  const { getByTestId } = render(
    <TodoList todos={todos} onDelete={mockDeleteHandler} />
  );
  const deleteButton = getByTestId('delete-button-1');
  fireEvent.click(deleteButton);
  expect(mockDeleteHandler).toHaveBeenCalledWith(1);
});