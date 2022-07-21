export default function TodoForm({ todoInputValue, handleTodoInputChange, handleTodoButtonClick }){
  return (
    <>
      <TodoInput handleTodoInputChange={handleTodoInputChange} todoInputValue={todoInputValue}/>
      <TodoButton handleTodoButtonClick={handleTodoButtonClick}>
        Add New
      </TodoButton>
    </>
  )
}

const TodoInput = ({ handleTodoInputChange, todoInputValue }) =>{
  return <input key="todoInput" aria-label="todo-input" value={todoInputValue} onChange={handleTodoInputChange}/>
}

const TodoButton = ({ handleTodoButtonClick, children }) =>{
  return <button aria-label="todo-button" onClick={handleTodoButtonClick}>{children}</button>
}

