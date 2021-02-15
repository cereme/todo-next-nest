export type TodoItemProps = {
  title: string
}

export default function TodoItem({title}: TodoItemProps){
  return (
    <div className="flex flex-row items-center ma-2">
      <span className="flex-grow">{title}</span>
      <input type="checkbox"/>
      <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Delete</button>
    </div>
  )
}