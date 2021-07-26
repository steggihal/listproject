import React from "react";
import {Input, Button, TextField} from "@material-ui/core";
import ChkBoxLabel from './CheckboxesUI'
import IconButton from "@material-ui/icons/Delete";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ToDoCard(props) {

  return(
      <form>
            <ChkBoxLabel taskItem={props.taskItem} checked = {props.checked} status={props.status} id={props.id} onRemove={props.onRemove}/>
      </form>
  )
}
