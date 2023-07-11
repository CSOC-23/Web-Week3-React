import "../styles/globals.css";
import { AuthProvider } from "../context/auth";
import Navbar from "../components/Navbar";
import AddTaskPanel from "../components/AddTaskPanel";
import TodoListItem from "../components/TodoListItem";
import { useState } from "react";

function MyApp() {
	
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null)

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #153677, #4e085f)",
      }}
    >
      <Navbar />
      {/* <Component {...pageProps} /> */}
      {/* <TodoListItem/> */}
      <div
        className="container my-5"
        style={{
          width: "42vw",
          backgroundColor: "white",
          height: "75vh",
          borderRadius: "15px",
          padding: "3%",
        }}
      >
        <AddTaskPanel
          input={input}
          setInput={setInput}
          todos={todos}
          setTodos={setTodos}
		      editTodo={editTodo}
		      setEditTodo={setEditTodo}
        />
        <div
          className="container"
          style={{ height: "60%", overflowY: "scroll" }}
        >
          <TodoListItem 
            todos={todos}
            setTodos={setTodos}
			      setEditTodo={setEditTodo} 
          />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
