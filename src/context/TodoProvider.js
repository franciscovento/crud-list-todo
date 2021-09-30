import { createContext } from "react"
import { arrayTask } from '../services/getTasks';


export const TodoContext = createContext();



const TodoProvider = ({children}) => {
 
const value = {
    arrayTask,
}

  return (
    <TodoContext.Provider value={value}> 
        {children}
    </TodoContext.Provider>
  )
}

export default TodoProvider
