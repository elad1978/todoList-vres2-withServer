import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then((res) => {
        return res.json();
      })
      .then((tasks) => {
        setTasks(tasks);
      });
  }, []);

  function addTask(t) {
    console.log("task: ", t);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    };
    fetch("http://localhost:3000/api/tasks", requestOptions)
      .then((response) => response.json())
      .then((data) => setTasks([...tasks, data]));

    //setTasks([...tasks, t]);
  }

  const handleRemove = (id) => {
    console.log(id);
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3000/api/tasks/${id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setTasks([...data]));
  };

  const updateTask = (t) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    };
    fetch(`http://localhost:3000/api/tasks/${t.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setTasks([...data]));
  };

  return (
    <div className="m-5">
      <h1>Todo List</h1>
      <TaskForm onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        handleRemove={handleRemove}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
