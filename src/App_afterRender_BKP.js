import React, {useEffect, useState} from 'react';
import css from './App.css'
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import {Place} from "@material-ui/icons";
import Entries from './Components/EntriesList'
import EntriesList from "./Components/EntriesList";

function App(){

    const itemName = EntriesList;

    const [todolist, setMode] = useState(itemName);
    const axios = require('axios')
   useEffect(() => {axios.get('https://jsonplaceholder.typicode.com/todos')
                .then(function (response) {
                let renderedArray = []
                response.data.map(task => {
                    const newTaskList = {
                        id: task.id,
                        task: task.title,
                        userID: task.userID,
                        status: task.completed
                    }
                    renderedArray.push(newTaskList)
                })
                setMode(renderedArray)
            console.log("Called API")
            }
    ) } ,[])

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
               todolist.map((itemToDo,index) => <ToDoCard key={itemToDo.id} taskItem={itemToDo.task} id={index} onRemove={onRemove}/>)
       // itemName.map(item => {return <li>{itemName.title}</li>;})
            }
            </div>
            <Form addItemToList={menuitem}/>
        </div>
    );
}

export default App;