import React,{useState} from 'react';
import css from './App.css'
import ToDoCard from "./Components/ToDoCard";
import Form from './Form'
import {Place} from "@material-ui/icons";

    const response = fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .then(result => response.data)

const itemName = [response.result]

// const itemName = [
//     {
//         id: 1,
//         task: "Eat Breakfast"
//     },
//     {
//         id: 2,
//         task: "Commute"
//     },
//        {
//         id: 3,
//         task: "Create Awesome React App"
//     },
//         {
//         id: 4,
//         task: "Conquer World"
//     }
// ]


function App(){

    const [todolist, setmode] = useState(itemName);

    function menuitem(itemBeingInserted) {
        const menuitem = [...todolist]
        menuitem.push(itemBeingInserted)
        setmode(menuitem)
    }



    function onRemove(index) {
        const newItems = [...todolist]
        newItems.splice(index, 1)
        setmode(newItems)
    }

    return(
        <div>
            <div>
            {
               todolist.map( (itemToDo,index) => <ToDoCard key={todolist.id} taskItem={todolist.title} id={index} onRemove={onRemove}/>)
       // itemName.map(item => {return <li>{itemName.title}</li>;})
            }
            </div>
            <Form addItemToList={menuitem}/>
        </div>
    );
}

export default App;