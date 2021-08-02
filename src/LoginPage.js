import React, {useState, useContext} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import css from './App.css'
import UserContext from "./Components/UserContext";


const LoginPage = () => {

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const userContext = useContext(UserContext)

    const handleLogin = (e) => {
        userContext.actions.login(username,password)
    }

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="center">
            <form className="myButton">
                <h2 className="header"> LOGIN PAGE</h2>
                <TextField label="Enter username" variant="outlined" color="primary" value={username}
                           onChange={onUsernameChange}/>
                &ensp;
                <TextField label="Enter password" type="password" variant="outlined" color="primary" value={password}
                           onChange={onPasswordChange}/> {'\n'}
                &ensp;
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
                &ensp;
                <div> Don't have an account yet? Click <Link to="/create-new-account"> here</Link> to create one!</div>
            </form>
        </div>
    );
};

export default LoginPage;