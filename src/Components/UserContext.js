import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router";
import {Link, Route} from "react-router-dom";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import {render} from "@testing-library/react";

const UserContext = React.createContext({})

export const UserProvider = (props) => {
    const [userList, setUsers] = useState(null)
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [password, setPassword] = useState(null)

    const context = useContext(UserContext)


    // users.map( (entries) => login(entries.username, entries.password))
    const history = useHistory();
    const login = (username, password) => {
        axios.post('http://localhost:5000/auth', {
            username,
            password
        }).then(resp => {
            localStorage.setItem('session_token', resp.data.access_token)
            history.push('/directory')
        })
    }
// else
//     {
//         alert("Invalid credentials. Try again");
//     }

const logout = () => {
    localStorage.removeItem('session_token')
    history.push(`/login`)
}

const value = {
    actions: {
        login: login,
        logout: logout
    }
}

return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
)
}


export const UserConsumer = UserContext.Consumer
export default UserContext