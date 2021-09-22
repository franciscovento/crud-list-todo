import { useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import  { Days, Month } from '../services/getDate'

const arrayTask = [
    {
        task: "sacar a pasear al perro",
        status: true
    },
    {
        task: "ir al cine",
        status: false
    },
    {
        task: "tarea de academlo",
        status: false
    }
]



const TodoContainer = () => {

    

    const [tareas, setTareas] = useState(arrayTask);
    const [currentTask, setCurrentTask] = useState("");

    
 


    const handleChangue = (e) => {
        setCurrentTask(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentTask !== ""){
           
        setTareas([...tareas, {task: currentTask, status: false}])
       setCurrentTask("");
        }else{
            alert("Debes ingresar una tarea");
        }
    }

    const handleDelete = (id) => {
        const deleteTodos = [...tareas];
        deleteTodos.splice(id, 1);
        setTareas(deleteTodos);
    }
    
const month = Month[new Date().getMonth()];
const date = new Date().getDate();
const day = Days[new Date().getDay()];



  return (
    <div className='bg-white p-5 sm:p-10 rounded-md shadow-2xl'>
        <div className='flex justify-between items-center '>
        <h2 className='text-purple-700 font-semibold text-3xl'>{day}, <span className='text-purple-500'>{date}th</span></h2>
        <p className='text-gray-400 font-semibold'>{tareas.length} Task</p>
        </div>
        <p className='text-gray-400'>{month}</p>
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <input className='mt-4 mb-2 border-b-2 outline-none w-full' type="text" onChange={(e) => handleChangue(e)} value={currentTask} placeholder='Ingresa tareas pendientes del día...' />
        <button className='mb-4 bg-purple-500 px-3 py-1 float-right	text-white rounded text-xl ' type='submit'>+</button>
        </form>
    </div>
    <div className='max-h-80 overflow-y-auto w-full' id='taskcontainer-scroll'>
      {tareas.map((x,i) => <TodoItem key={i} task={x.task} status={x.status} id={i} handleDelete={handleDelete}  />)}
    </div>
    </div>
  )
}

export default TodoContainer
