import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  //when you refresh the page, the existing code still be there

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);

    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const temp = JSON.stringify(todos);
    localStorage.setItem("todos", temp);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.todo.value === "") return;
    const newTodo = {
      //you will get new ids every time
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
    setEditingText("");
  }

  return (
    <div className="font-serif h-screen bg-neutral-900  ">
      <h1 className="text-xl font-bold text-red-400 p-4 mt-0 pl-10">
        Todo List{""}
      </h1>
      <form className=" flex flex-wrap items-center" onSubmit={handleSubmit}>
        <input
          className=" p-1 text-center mx-4 my-4 text-amber-800 bg-orange-300 rounded-md bg-blend-color"
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
          name="todo"
        />
        {todos.length < 10 && (
          <button className="rounded-md text-yellow-500 text-md" type="submit">
            + New Todo
          </button>
        )}
      </form>
      {todos.map((todo) => (
        <div className="flex flex-wrap items-baseline" key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              className="rounded-md text-center m-4 p-1 text-teal-900
               bg-teal-500
               "
              type="text"
              //placeholder={todo.text}
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div className="w-48 ml-8 text-amber-400">{todo.text}</div>
          )}
          <input
            className="p-2 ml-4 "
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.completed}
          />
          <button
            className="text-red-400 m-2 mr-6 ml-8 text-sm"
            onClick={() => deleteTodo(todo.id)}
          >
            DELETE
          </button>

          {todoEditing === todo.id ? (
            <button
              className="text-sm text-emerald-500 m-4"
              onClick={() => editTodo(todo.id)}
            >
              SAVE
            </button>
          ) : (
            <button
              className="text-sm text-emerald-500 m-4"
              onClick={() => setTodoEditing(todo.id)}
            >
              EDIT{" "}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
