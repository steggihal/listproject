import React, {useContext, useEffect, useState} from 'react';
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import axios from "axios";
import {Button} from "@material-ui/core";
import UserContext from "./Components/UserContext";

function App(url, config) {

    const itemList = []
    const context = useContext(UserContext);
    const [todolist, setMode] = useState(itemList);


    useEffect(() => {
        if (!localStorage.getItem('session_token')) {
            context.actions.logout()
        }
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/api/items', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        }).then((result) => {
            setMode(result.data)
        })
    }, [])

    function menuitem(itemBeingInserted) {
        axios.post('http://localhost:5000/api/items', itemBeingInserted, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        })
            .then((result) => {
                setMode(result.data)
            })
    }

    function onRemove(index) {
        axios.delete('http://localhost:5000/api/items/'+ index, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('session_token')}`
            }
        })
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
                <Button variant="outlined" onClick={context.actions.logout}> Logout</Button>
            </div>
        </div>
    );
}

export default App;