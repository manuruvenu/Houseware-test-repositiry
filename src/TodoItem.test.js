import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

test('renders TodoItem component with a todo', () => {
  const todo = { id: 1, text: 'Test Todo', completed: false };
  const { getByText } = render(<TodoItem todo={todo} />);
  const todoText = getByText('Test Todo');
  expect(todoText).toBeInTheDocument();
});

test('marks todo as complete on clicking the complete button', () => {
  const todo = { id: 1, text: 'Test Todo', completed: false };
  const mockCompleteHandler = jest.fn();
  const { getByTestId } = render(
    <TodoItem todo={todo} onComplete={mockCompleteHandler} />
  );
  const completeButton = getByTestId('complete-button');
  fireEvent.click(completeButton);
  expect(mockCompleteHandler).toHaveBeenCalledWith(1);
});

test('removes todo on clicking the delete button', () => {
  const todo = { id: 1, text: 'Test Todo', completed: false };
  const mockDeleteHandler = jest.fn();
  const { getByTestId } = render(
    <TodoItem todo={todo} onDelete={mockDeleteHandler} />
  );
  const deleteButton = getByTestId('delete-button');
  fireEvent.click(deleteButton);
  expect(mockDeleteHandler).toHaveBeenCalledWith(1);
});