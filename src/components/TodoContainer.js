import {  useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import  { Days, Month } from '../services/getDate'
import Eliminados from "./Eliminados"



const arrayTask = [
    {
        id: 1,
        task: "sacar a pasear al perro",
        status: true
    },
    {
        id: 2,
        task: "ir al cine",
        status: false
    },
    {
        id: 3,
        task: "tarea de academlo",
        status: false
    }
]



const TodoContainer = () => {


    const [tareas, setTareas] = useState(arrayTask);
    const [currentTask, setCurrentTask] = useState("");
    const [eliminados, setEliminados] = useState("");
    const [contador, setContador] = useState(4);
    const [filter, setFilter] = useState('all');
    
    useEffect(()=> {
        if (localStorage.getItem("taks")) {
            const dataLocalStorage = localStorage.getItem("taks");
           setTareas(JSON.parse(dataLocalStorage));
        }

        if(localStorage.getItem("eliminados")){
            const eliminadosLocalStorage = localStorage.getItem("eliminados");
            setEliminados(JSON.parse(eliminadosLocalStorage))
        }

        if(localStorage.getItem("contador")){
            const contadorIds = Number(localStorage.getItem("contador"))
            setContador(contadorIds);
        }

    },[])


    const handleChangue = (e) => {
        setCurrentTask(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setContador(prev => prev + 1);
        if(currentTask === ""){
            alert("Debes ingresar una tarea");
        }else if (tareas.find(x => x.task.toLowerCase() === currentTask.toLowerCase())) {
            alert("Esa tarea ya existe, agrega otra")
        }
        else{
            setTareas([...tareas, {id:contador, task: currentTask, status: false}])
            setCurrentTask("");
        }
    }

    

    const handleDelete = (id) => {
        const deleteTodos = [...tareas];
        const itemDelete = deleteTodos.findIndex(x => x.id === id);
        const item = deleteTodos.find(x => x.id === id)
        deleteTodos.splice(itemDelete, 1);
        setEliminados([...eliminados, item])
        setTareas(deleteTodos);
     
    }

    const handleUpdate = (id) => {
        const updateTodos = [...tareas];
        const itemUpdate = updateTodos.findIndex(x => x.id === id)
        let item = updateTodos.find(x => x.id === id)
         item = {...item, status: !item.status}
        updateTodos.splice(itemUpdate, 1, item)
        setTareas(updateTodos);
        
    }

    const handleEmptyTrash = () => {
        setEliminados("");
    }
    
const month = Month[new Date().getMonth()];
const date = new Date().getDate();
const day = Days[new Date().getDay()];


useEffect(()=> {

    localStorage.setItem("taks", JSON.stringify(tareas));
    localStorage.setItem("eliminados", JSON.stringify(eliminados));
    localStorage.setItem("contador",JSON.stringify(contador));

},[tareas, eliminados, contador])

const filterRender = (filter) => {
    switch(filter){
      case 'pending':
        
        return tareas.filter(x => x.status === false);
     case 'completed':
        
        return tareas.filter(x => x.status === true);
      case 'eliminados':
        return eliminados;
      case 'all':
        
        return tareas;
      default:
        return eliminados;
    }
  }




  return (
   
    <div className='bg-white p-5 sm:p-10 rounded-md shadow-2xl min-h-600 min-w-320 sm:min-w-460 relative'>
        <div className='flex justify-between items-center '>
        <h2 className='text-purple-700 font-semibold text-3xl'>{day}, <span className='text-purple-500'>{date}th</span></h2>
        <p className='text-gray-400 font-semibold'>{tareas.length} Task</p>
        </div>
        <p className='text-gray-400'>{month}</p>
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <input className='mt-4 mb-2 border-b-2 outline-none w-full' type="text" onChange={(e) => handleChangue(e)} value={currentTask} placeholder='What do you have to do today?' />
        <div className='flex items-center justify-between mb-4'>
            <div onClick={()=> {setFilter('all')}} className='transition-all hover:text-purple-600 cursor-pointer'> ← Ver todos</div>
            <button className='bg-purple-500 px-3 py-1 float-right	text-white rounded text-xl transition-all hover:bg-purple-600' type='submit'>+</button>
        </div>
        </form>
    </div>
    <div className='max-h-80 overflow-y-auto w-full' id='taskcontainer-scroll'>
        {filter !== 'eliminados' ? filterRender(filter).map(x => <TodoItem  task={x.task} status={x.status} handleUpdate={handleUpdate} id={x.id} handleDelete={handleDelete}/>) : <div className='text-center'> {eliminados && eliminados.map((x,i) => <Eliminados key={i} task={x.task} />)} <button onClick={handleEmptyTrash} className='mt-5 transition-all hover:text-red-500 hover:underline'>Vaciar papelera</button> </div> }
    </div>
    <div className='flex gap-5 justify-center mt-10 absolute -inset-x-0 bottom-6'>
        <button className='bg-green-500 px-2 text-gray-100 rounded py-1 transition-all hover:bg-green-600 ' onClick={()=> {setFilter('completed')}}> Completed</button>
        <button className='bg-yellow-500 px-2 text-gray-100 rounded py-1 transition-all hover:bg-yellow-600' onClick={()=> {setFilter('pending')}}> Pending</button>
        <button className='bg-gray-500 px-2 text-gray-100 rounded py-1 transition-all hover:bg-gray-600 ' onClick={()=> {setFilter('eliminados')}}> Eliminados</button>
    </div>
    </div>
 
  )
}

export default TodoContainer