import React from "react";
import './App.css';

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");


  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);
//add function
  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  //delete function 
  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }
  function toggleNext(id) {

    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  }


  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          required=""
        />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
  
             
                
              
              <p>
                {todo.text}
    
              </p> 
                
                <div  className="check">
                <input
              type="checkbox"
              id="completed"
              checked={todo.completed}
              onChange={() => toggleNext(todo.id)}
             
              
            />

                </div>
               
                <div className="todo-actions">

<button onClick={() => deleteTodo(todo.id)} className="delete-btn">Delete</button>
</div>
            

                
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default App;
