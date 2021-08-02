import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";
import css from './App.css'
import axios from "axios";
import {useHistory} from "react-router";

const NewAccountPage = () => {

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    })

    const [errors, setErrors] = useState({})

    const history = useHistory()

    const extractError = key => {
        if (errors[key]) {
            return errors[key].join(' ')
        }
        return ''
    }

    const create = () => {
        axios.post('http://localhost:5000/api/users/', formState)
            .then((result) => {
                if (result.data != 'False') {
                    alert('new account created, login to access your to-do list')
                } else {
                    alert('username or email exists, login to access account')
                }
                history.push('/')
            }).catch((e) => {
            setErrors(e.response.data)
        })
    }


    const setFormField = field => e => {
        setFormState({...formState, [field]: e.target.value})
    }


    return (
        <div className="center">
            <form className="myButton">
                <h2 className="header"> NEW USER PAGE</h2>
                <TextField label="Create username" value={formState.username} variant="outlined" color="primary"
                           onChange={setFormField('username')}/>
                <span style={{color: 'red'}}>{extractError('username')}</span>
                &ensp;
                <TextField label="Enter email" value={formState.email} variant="outlined" color="primary"
                           onChange={setFormField('email')}/>
                <span style={{color: 'red'}}>{extractError('email')}</span>
                &ensp;
                <TextField label="Create password" value={formState.password1} type="password" variant="outlined"
                           color="primary" onChange={setFormField('password1')}/>
                <span style={{color: 'red'}}>{extractError('password1')}</span>
                &ensp;
                <TextField label="Enter password again" value={formState.password2} type="password" variant="outlined"
                           color="primary" onChange={setFormField('password2')}/>
                <span style={{color: 'red'}}>{extractError('password2')}</span>
                &ensp;
                <Button variant="outlined" onClick={create}>Create Account</Button>
                <span style={{color: 'red'}}>{extractError('_schema')}</span>
                &ensp;
                <div> Click <Link to="/login"> here</Link> to go back to login page</div>
            </form>
        </div>
    )

};

export default NewAccountPage;