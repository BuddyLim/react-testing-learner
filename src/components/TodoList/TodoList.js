import { useState } from "react";
import { v4 as uuid } from 'uuid';
import TodoForm from "../TodoForm/TodoForm";

export default function TodoList(){
  const [listOfTodo, setListOfTodo] = useState([])
  const [todoInputValue, setTodoInputValue] = useState("")

  const handleTodoInputChange = (e) =>{
    setTodoInputValue(e.target.value)
  }

  const handleTodoButtonClick = () =>{
    setListOfTodo(prevList =>{
      return [{ id: uuid(), text: todoInputValue }, ...prevList]
    })
    setTodoInputValue("")
  }

  const handleTodoDeleteClick = (id) =>{
    setListOfTodo(prevList =>{
      return prevList.filter(todoItem => todoItem.id !== id)
    })
  }

  return(
    <div>
      <TodoForm todoInputValue={todoInputValue} handleTodoInputChange={handleTodoInputChange} handleTodoButtonClick={handleTodoButtonClick}/>
      {listOfTodo.map((todoObj =>{
        const { id, text } = todoObj
        return (
          <div key={id}>
            <span>{text}</span>
            <button onClick={() => handleTodoDeleteClick(id)} aria-label={`todo-delete-${text}`}>Delete</button>
          </div>
        )
      }))}
    </div>
  )
}