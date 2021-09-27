import './App.css';
import TodoContainer from './components/TodoContainer';
import TodoProvider from './context/TodoProvider';


function App() {
  return (
    <TodoProvider>
    <div className="bg-gradient-to-r from-green-400 to-blue-500  min-h-screen flex items-center justify-center">
      <TodoContainer />
    </div>
    </TodoProvider>
  );
}

export default App;
