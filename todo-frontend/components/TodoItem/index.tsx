import FormInsertTodo from "./FormInsertTodo";
import TodoItem from "./TodoItem";

export default function TodoList(){
  return (
    <div className="border-2 flex-column">
      <h2 className="text-center">My Todo List</h2>
      <TodoItem/>
      <TodoItem/>
      <FormInsertTodo/>
    </div>
  )
}