import React from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import css from './App.css'

const NewAccountPage = () => {
    return (
        <div className="center">
            <form className="myButton">
                <h2 className="header"> NEW USER PAGE</h2>
                <TextField label="Create username" variant="outlined" color="primary"/>
                &ensp;
                <TextField label="Enter email" variant="outlined" color="primary"/>
                &ensp;
                <TextField label="Create password" type="password" variant="outlined" color="primary"/>
                &ensp;
                <TextField label="Enter password again" type="password" variant="outlined" color="primary"/>
                &ensp;
                <Button variant="outlined">Create Account</Button>
                &ensp;
                <div> Click <Link to="/login">  here</Link> to go back to login page</div>
            </form>
        </div>
    )

};

export default NewAccountPage;