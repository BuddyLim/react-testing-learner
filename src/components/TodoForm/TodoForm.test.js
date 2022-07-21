import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

test('Renders Todo Form', () => {
  render(<TodoForm />);
  const todoInputButton = screen.getByText(/Add New/i);
  expect(todoInputButton).toBeInTheDocument();
});

test('Todo Form: Should render what is being typed inside', () => {
  render(<TodoForm />);
  const todoInput = screen.getByLabelText('todo-input');

  fireEvent.change(todoInput, {target: {value: '23asdfasfd'}})
  expect(todoInput.value).toBe('23asdfasfd')

  fireEvent.change(todoInput, {target: {value: '@@#@#@#@#!(_#$)_@$Isdjfkjasdkfjksdfj'}})
  expect(todoInput.value).toBe('@@#@#@#@#!(_#$)_@$Isdjfkjasdkfjksdfj')

  fireEvent.change(todoInput, {target: {value: '漢字Д'}})
  expect(todoInput.value).toBe('漢字Д')

  fireEvent.change(todoInput, {target: {value: '😀'}})
  expect(todoInput.value).toBe('😀')
})




