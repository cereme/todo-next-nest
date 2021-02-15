import useSWR from 'swr';

import FormInsertTodo from "./FormInsertTodo";
import TodoItem from "./TodoItem";

const todoListFetcher = () => fetch('http://localhost:7000/todo').then(res => res.json());

export default function TodoList(){
  const { data, error } = useSWR('/todo', todoListFetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <div className="border-2 flex-column">
      <h2 className="text-center">My Todo List</h2>
      {data.map(e => (
        <TodoItem title={e.title} key={e.id}/>
      ))}
      <FormInsertTodo/>
    </div>
  )
}