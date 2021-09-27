import { useState } from "react";
import { createContext } from "react"
import { arrayTask } from '../services/getTasks';


export const TodoContext = createContext();



const TodoProvider = ({children}) => {
    const [counter, setCounter] = useState(0);

    const miFunc = () => {
        console.log('desde el context')
    }

const value = {
    counter,
    arrayTask,
    incrementar: () => setCounter(prev => prev + 1),
    disminuir: () => setCounter(prev => prev -1),
    miFunc: () => miFunc()
}

  return (
    <TodoContext.Provider value={value}> 
        {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
