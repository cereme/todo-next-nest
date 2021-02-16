import axios from 'axios';
import useSWR from 'swr';

import FormInsertTodo from "./FormInsertTodo";
import TodoItem from "./TodoItem";

const todoListFetcher = () => axios.get(`/todo`).then(res => res.data);

export default function TodoList(){
  const { data, error } = useSWR('/todo', todoListFetcher);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  
  return (
    <div className="border-2 flex-column px-4 py-2">
      <h2 className="text-center">My Todo List</h2>
      {data.map(e => (
        <TodoItem title={e.title} id={e.id} key={e.id} description={e.description}/>
      ))}
      <FormInsertTodo/>
    </div>
  )
}