import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  // const [tasks, setTasks] = useState([
  //   { id: 1, text: "elad" },
  //   { id: 0, text: "elad" },
  // ]);
  //console.log(tasks);
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

  // const getUsers = () => {
  //   fetch("http://localhost:3000/api/tasks")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((tasks) => {
  //       setTasks(tasks);
  //     });
  // };

  // POST request using fetch inside useEffect React hook
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(t),
  // };
  // fetch("http://localhost:3000/api/tasks", requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => setTasks(data));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  // function addTask(t) {
  //   console.log("task: ", t);
  //   setTasks([...tasks, t]);
  // }

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

  //
  // const updateTask = (newTask) => {
  //   const newState = tasks.map((t) => {
  //     if (t.id === newTask.id) {
  //       return { ...t, text: newTask.text };
  //     }
  //     return t;
  //   });
  //   setTasks(newState);
  // };

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
