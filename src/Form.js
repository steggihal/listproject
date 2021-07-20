import React, {useState} from 'react';
import {Input, Button, TextField, Checkbox} from "@material-ui/core";
import Change from './Components/HandleChange';
import ChkBox from './Components/CheckboxesUI'
import ToDoCard from "./Components/ToDoCard";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import css from './App.css'

const Form = (props) => {
    const [id, setID] = useState("");
    const [task, setTask] = useState("");

  const HandleButtonClick = function(e) {
          props.addItemToList({id: id, task: task})
          setID('')
          setTask('')
  }

    const handleTaskChange = function(e){
        setTask(e.target.value)
      }
    return (
            <div>
                <form className="center" >
                    <TextField label="Description" variant="outlined" color="primary" value={task} onChange={handleTaskChange}/>
                    &ensp;
                    <Button disabled={!task} variant="outlined" onClick={HandleButtonClick}>
                        Add
                    </Button>
                </form>
            </div>
    );
};

export default Form;