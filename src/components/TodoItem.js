


const TodoItem = ({task, status, handleUpdate, id, handleDelete}) => {
  

    return (  
    <div className='flex gap-5 items-center justify-between w-72 sm:w-96'>
            <div className='flex items-center gap-2'>
            <input type="checkbox" className='checked:bg-red-400' checked={status} onChange={()=>handleUpdate(id)} />  
            <h2 className={status? 'line-through text-gray-400' :'' }>{task}</h2>
            </div>
            {status? <button onClick={() => handleDelete(id)} className='bg-red-400 text-white p-1 m-1 text-xs'>Delete</button> : ""}
    </div>
  )
}

export default TodoItem
