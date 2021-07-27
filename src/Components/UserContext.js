import React, {useState} from 'react';
import {useHistory} from "react-router";
import InvalidLogin from "./InvalidLogin";

const UserContext = React.createContext({})

const validUsers = [
    {
        id: 0,
        name: 'Sampada',
        password: 'sam123',
        state: 'IA'
    },
    {
        id: 1,
        name: 'Adis',
        password: 'adis123',
        state: 'IA',
    },
    {
        id: 2,
        name: 'Colby',
        password: 'colby123',
        state: 'IA',
    },
    {
        id: 3,
        name: 'Luke',
        password: 'luke123',
        state: 'IA',
    }
]

export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(null)
    const [password, setPassword] = useState(null)

    const history = useHistory();
    const login = (username, password) => {
        const user = validUsers.find(u => u.name === username)
        const pass = validUsers.find(p => p.password === password)

        for ( i = 0; i <=3; i++) {
        ObjectRow()
    }
        if (user && pass) {
            setLoggedInUser(user)
            setPassword(pass)
            history.push(`/directory/${user.id}`)
        } else {

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

    return (<UserContext.Provider value={value}>{props.children}</UserContext.Provider>)
}


export const UserConsumer = UserContext.Consumer
export default UserContext