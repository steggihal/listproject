import React, {useEffect, useState} from 'react';
import css from './App.css'
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import RenderingJSON from './Components/RenderinJSON'
import axios from "axios";

//testing a new line addition

function App(){

    const itemList = []

    const [todolist, setMode] = useState(itemList);
    useEffect(() => {
        axios.get('http://localhost:5000/').then((result) => {
        setMode(result.data)
    })
    }, [])


    function menuitem(itemBeingInserted) {
        const menuitem = [...todolist]
        menuitem.push(itemBeingInserted)
        setMode(menuitem)
    }

    function onRemove(index) {
        const newItems = [...todolist]
        newItems.splice(index, 1)
        setMode(newItems)
    }

    return(
        <div>
            <div>
            {
               todolist.map((itemToDo,index) => <ToDoCard key={itemToDo.id} status={itemToDo.status} taskItem={itemToDo.task} id={index} onRemove={onRemove}/>)
            }
            </div>
            <Form addItemToList={menuitem}/>
        </div>
    );
}

export default App;