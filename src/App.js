import React, {useEffect, useState} from 'react';
import css from './App.css'
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import axios from "axios";
import EntriesList from "./Components/EntriesList";


function App() {

    const itemList = []

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
        axios.delete('http://localhost:5000/api/items/'+index)
            .then((result) => {
                setMode(result.data)
            })
    }

    return (
        <div>
            <div>
                {
                    todolist.map((itemToDo) => <ToDoCard key={itemToDo.id} status={itemToDo.status} taskItem={itemToDo.task} id={itemToDo.id} onRemove={onRemove}/>)
                }
            </div>
            <Form addItemToList={menuitem}/>
        </div>
    );
}

export default App;