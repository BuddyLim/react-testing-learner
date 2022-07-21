import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

test('Todo List: Should render new items when added', () => {
  render(<TodoList />);
  const text = "23asdfasfd"

  const todoInput = screen.getByLabelText('todo-input');
  fireEvent.change(todoInput, {target: {value: text}})
  expect(todoInput.value).toBe(text)

  const todoButton = screen.getByLabelText('todo-button')
  fireEvent.click(todoButton)

  expect(todoInput.value).toBe("")
  
  const todoItem = screen.getByText(text)
  expect(todoItem).toBeInTheDocument()
})

test('Todo List: Should delete an item when item delete button is clicked', () => {
  render(<TodoList />);
  const listOfText = ['abc','def','ghi','jkl']

  const todoInput = screen.getByLabelText('todo-input');
  const todoAddButton = screen.getByLabelText('todo-button')

  for (let index = 0; index < listOfText.length; index++) {
    const text = listOfText[index];
    fireEvent.change(todoInput, {target: {value: text}})
    fireEvent.click(todoAddButton)
  }

  const todoDeleteButton = screen.getByLabelText(`todo-delete-${listOfText[0]}`)
  fireEvent.click(todoDeleteButton)
  
  expect(todoDeleteButton).not.toBeInTheDocument()

  for (let index = 1; index < listOfText.length; index++) {
    const text = listOfText[index];
    const todoDeleteButton = screen.getByLabelText(`todo-delete-${text}`)
    expect(todoDeleteButton).toBeInTheDocument()
  }
})

