import {useEffect} from "react";
import axios from "axios";
import Entries from './EntriesList'

export default function RenderingJSON() {
    const axios = require('axios')
    let renderedArray = Entries

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                    response.data.map(tasks => {
                        const newTaskList = {
                            id: tasks.id,
                            task: tasks.title,
                            userID: tasks.userID,
                            status: tasks.completed
                        }
                        renderedArray.push(newTaskList)
                    })
                }
            )
    }, [])

    return(renderedArray)
}
