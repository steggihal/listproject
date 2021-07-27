import React, {useContext, useEffect, useState} from 'react';
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import axios from "axios";
import EntriesList from "./Components/EntriesList";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import UserContext from "./Components/UserContext";
import css from './App.css'

function App() {

    const itemList = []
    const context = useContext(UserContext);
    const [todolist, setMode] = useState(itemList);

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //         .then(response => {
    //                 const updatedList = []
    //                 response.data.map(tasks => {
    //                     const newTaskList = {
    //                         id: tasks.id,
    //                         task: tasks.title,
    //                         userID: tasks.userID,
    //                         status: tasks.completed
    //                     }
    //                     updatedList.push(newTaskList)
    //                 })
    //                 setMode(updatedList)
    //             }
    //         )
    // }, [])


    useEffect(() => {
        axios.get('http://localhost:5000/api/items').then((result) => {
            setMode(result.data)
        })
    }, [])

    function menuitem(itemBeingInserted) {
        axios.post('http://localhost:5000/api/items', itemBeingInserted)
            .then((result) => {
                setMode(result.data)
            })
    }

    function onRemove(index) {
        axios.delete('http://localhost:5000/api/items/' + index)
            .then((result) => {
                setMode(result.data)
            })
    }

    return (
        <div>
            <div>
                {
                    todolist.map((itemToDo) => <ToDoCard key={itemToDo.id} status={itemToDo.status}
                                                         checked={itemToDo.checked} taskItem={itemToDo.task}
                                                         id={itemToDo.id} onRemove={onRemove}/>)
                }
            </div>
            <Form addItemToList={menuitem}/>
            &ensp;
            <div className="center">
                <Button  variant="outlined" onClick={context.actions.logout}> Logout</Button>
            </div>
        </div>
    );
}

export default App;