export default function FormInsertTodo(){
  return (
    <div className="flex flex-row">
      <input type="text" className="flex-grow"/>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
    </div>
  )
}