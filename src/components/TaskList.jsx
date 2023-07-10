import React from "react";
import { useState } from "react";
const TaskList = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState("");
  console.log(content);
  const handleBlur = (e) => {
    setContent(e.target.textContent);
    console.log(e.target.textContent);
    setIsEditable(false); 
  };

  const updateTask = (id) => {
    props.onUpdate({ id: id, text: content });
    setContent("");
  };

  return (
    <ul className="list-group m-1">
      {props.tasks.map((task) => (
        <li className="list-group-item" key={task.id}>
          <span
            className="p-2"
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
          >
            {task.text}
          </span>
          <button
            className="btn btn-outline-primary m-1"
            type="button"
            onClick={() => props.handleRemove(task.id)}
          >
            ✖️
          </button>
          <button
            className="btn btn-outline-primary m-1"
            onClick={() => setIsEditable(!isEditable)}
          >
            {isEditable ? "✅" : "✏️"}
          </button>
          <button
            // className={isEditable ?"btn btn-outline-primary m-1":"btn btn-outline-primary m-1 d-none"}
            className="btn btn-outline-primary m-1"
            onClick={() => updateTask(task.id)}
          >
            Update
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
