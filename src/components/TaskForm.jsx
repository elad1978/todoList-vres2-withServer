import React from "react";
import { useState } from "react";
const TaskForm = (props) => {
  const [text, setText] = useState("");
  const [id, setId] = useState(2);
  function submit(e) {
    e.preventDefault();
    props.onSubmit({ id: id, text: text });
    setId(id + 1);
    setText("");
  }

  function setInput(e) {
    setText(e.target.value);
    console.log(e.target.value);
  }

  return (
    <>
      <h2>AddTask</h2>
      <form className="form-control" onSubmit={submit}>
        <input
          className="form-control"
          type="text"
          onInput={setInput}
          value={text}
          required
        />
        <input className="btn btn-primary m-1" type="submit" value="Submit" />
      </form>
    </>
  );
};

export default TaskForm;
