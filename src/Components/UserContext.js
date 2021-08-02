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

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/').then((result) => {
            setUsers(result.data)
        })
    }, [])


    // users.map( (entries) => login(entries.username, entries.password))
    const history = useHistory();
    const login = (username, password) => {
        const user = userList.find(u => u.username == username)
        const pass = userList.find(p => p.password1 === password)
        if (user && pass) {
            setLoggedInUser(user)
            setPassword(pass)
            history.push(`/directory/${user.id}`)
        } else {
            alert("Invalid credentials. Try again");
        }
    }

    const logout = () => {
        setLoggedInUser(null)
        setPassword(null)
        history.push(`/`)
    }

    const value = {
        actions: {
            login: login,
            logout: logout
        },
        user: loggedInUser,
        pass: password
    }

    return (
        <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
    )
}


export const UserConsumer = UserContext.Consumer
export default UserContext