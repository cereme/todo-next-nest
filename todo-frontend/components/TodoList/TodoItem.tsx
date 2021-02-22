import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { mutate } from "swr"

export type TodoItemProps = {
  title: string
  description: string
  id: number
  userId: number
}

export default function TodoItem({ title, id, description, userId }: TodoItemProps): JSX.Element {
  const accordionDescription = useRef(null)
  const [descriptionHeight, setDescriptionHeight] = useState(0)

  const [expanded, setExpanded] = useState(false)
  const [editable, setEditable] = useState(false)
  const [editedDescription, setEditedDescription] = useState(description)

  useEffect(() => {
    if (accordionDescription.current) {
      setDescriptionHeight(accordionDescription.current.scrollHeight)
    }
  }, [accordionDescription, editable])

  const exitEditMode = () => setEditable(false)
  const enterEditMode = () => setEditable(true)

  const deleteTodoItem = async () => {
    mutate(`/todo?owner=${userId}`, (data) => data.filter((e) => e.id !== id), false)
    await axios.delete(`/todo/${id}`)
    mutate(`/todo?owner=${userId}`)
  }

  const submitDescription = async () => {
    mutate(
      `/todo?owner=${userId}`,
      (data) => data.map((e) => (e.id !== id ? e : { ...e, description: editedDescription })),
      false
    )
    await axios.patch(`/todo/${id}`, { description: editedDescription })
    mutate(`/todo?owner=${userId}`)
    exitEditMode()
  }
  const updateEditedDescription = (e) => setEditedDescription(e.target.value)

  const toggleAccordion = () => {
    setExpanded((v) => !v)
    exitEditMode()
  }

  return (
    <>
      <div className="flex flex-row items-center my-2 px-2 py-2 bg-gray-100 shadow">
        <span className="flex-grow" onClick={toggleAccordion}>
          {title}
        </span>
        {editable && (
          <>
            <button
              onClick={submitDescription}
              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 ml-2 rounded"
            >
              submit
            </button>
            <button
              onClick={exitEditMode}
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 ml-2 rounded"
            >
              cancel
            </button>
          </>
        )}
        {!editable && (
          <>
            <input type="checkbox" className="mx-2" />
            <button
              onClick={deleteTodoItem}
              className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
      <div
        className={`transition-all duration-1000 mb-2`}
        style={{
          maxHeight: expanded ? descriptionHeight : 0,
        }}
      >
        {editable && (
          <textarea
            value={editedDescription}
            onChange={updateEditedDescription}
            className={`inline-block w-full`}
          />
        )}
        {!editable && (
          <p
            ref={accordionDescription}
            onClick={enterEditMode}
            className={`transition-all duration-1000 break-all overflow-hidden inline-block hover:bg-gray-300 w-full 
            ${description ? "" : "text-gray-400"}`}
            style={{
              maxHeight: expanded ? descriptionHeight : 0,
            }}
          >
            {description || "무언가를 입력해봐요"}
          </p>
        )}
      </div>
    </>
  )
}
