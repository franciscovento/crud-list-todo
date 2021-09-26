import {  useEffect, useState } from "react"
import TodoItem from "./TodoItem"
import  { Days, Month } from '../services/getDate'
import Eliminados from "./Eliminados"
import Realizados from "./Realizados"
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom"
import Pendientes from "./Pendientes"

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
   
    useEffect(()=> {
        if (localStorage.getItem("taks")) {
            const dataLocalStorage = localStorage.getItem("taks");
           setTareas(JSON.parse(dataLocalStorage));
        }

        if(localStorage.getItem("eliminados")){
            const eliminadosLocalStorage = localStorage.getItem("eliminados");
            setEliminados(JSON.parse(eliminadosLocalStorage))
        }

    },[])


    const handleChangue = (e) => {
        setCurrentTask(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setContador(prev => prev + 1);
        if(currentTask !== ""){
        setTareas([...tareas, {id:contador, task: currentTask, status: false}])
       setCurrentTask("");
        }else{
            alert("Debes ingresar una tarea");
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

    
    
const month = Month[new Date().getMonth()];
const date = new Date().getDate();
const day = Days[new Date().getDay()];


useEffect(()=> {

    localStorage.setItem("taks", JSON.stringify(tareas));
    localStorage.setItem("eliminados", JSON.stringify(eliminados));

},[tareas, eliminados])


  return (
    <Router>
    <div className='bg-white p-5 sm:p-10 rounded-md shadow-2xl'>
        <div className='flex justify-between items-center '>
        <h2 className='text-purple-700 font-semibold text-3xl'>{day}, <span className='text-purple-500'>{date}th</span></h2>
        <p className='text-gray-400 font-semibold'>{tareas.length} Task</p>
        </div>
        <p className='text-gray-400'>{month}</p>
    <div>
        <form onSubmit={(e) => handleSubmit(e)}>
        <input className='mt-4 mb-2 border-b-2 outline-none w-full' type="text" onChange={(e) => handleChangue(e)} value={currentTask} placeholder='What do you have to do today?' />
        <div className='flex items-center justify-between mb-4'>
            <Link to='/'>← Ver todos</Link>
            <button className='bg-purple-500 px-3 py-1 float-right	text-white rounded text-xl ' type='submit'>+</button>
        </div>
        </form>
    </div>
    <div className='max-h-80 overflow-y-auto w-full' id='taskcontainer-scroll'>
        <Switch>
            <Route path='/' exact >
                {tareas.length > 0? tareas.map((x,i) => <TodoItem key={i} task={x.task} status={x.status} id={x.id} handleUpdate={handleUpdate} handleDelete={handleDelete}/>): 'Sin tareas'}
            </Route>
            <Route path='/eliminados'>
                {eliminados ? eliminados.map((x,i) => <Eliminados key={i} task={x.task} />) : "Papelera vacía"}
            </Route>
            <Route path='/realizados'>
                {tareas.filter(x => x.status === true).length > 0? tareas.filter(x => x.status === true).map((x,i) => <Realizados key={i} task={x.task} status={x.status} id={x.id} handleUpdate={handleUpdate} handleDelete={handleDelete}/>): 'No hay tareas realizadas'}
            </Route>
            <Route path='/pendientes'>
                {tareas.filter(x => x.status === false).length > 0? tareas.filter(x => x.status === false).map((x,i) => <Pendientes key={i} task={x.task} status={x.status} id={x.id} handleUpdate={handleUpdate} handleDelete={handleDelete}/>): 'No hay tareas pendientes'}
            </Route>
        </Switch>


    </div>
    <div className='flex gap-5 justify-center mt-10 '>
        <Link to='/realizados' className='bg-green-500 px-2 text-gray-100 rounded py-1'>Realizados</Link>
        <Link to='/pendientes' className='bg-yellow-500 px-2 text-gray-100 rounded py-1'>Pendientes</Link>
        <Link to='/eliminados' className='bg-gray-500 px-2 text-gray-100 rounded py-1'>Papelera</Link>
    </div>
    </div>
    </Router>
  )
}

export default TodoContainer
