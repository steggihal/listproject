import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {FormLabel} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

export default function Checkboxes(props) {
  const [checked, setChecked] = React.useState({checkedA: props.checked});

  const handleChange = (event) => {
    setChecked({[event.target.name]:[event.target.checked]});
  };

    const HandleDeleteButton = function(e) {
          props.onRemove(props.id)
  }


  return (
      <div className="center" >
          <Checkbox defaultChecked={props.checked}/>
          <FormLabel className="design" >{props.taskItem}</FormLabel>
          <IconButton aria-label="delete" onClick={HandleDeleteButton} >
              <DeleteIcon fontSize="small" />
          </IconButton>
      </div>
  );
}
