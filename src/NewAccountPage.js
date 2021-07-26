import React from 'react';
import {Button, TextField} from "@material-ui/core";

const NewAccountPage = () => {
    return (
        <div>
            <form className="center">
                <TextField label="Enter username" variant="outlined" color="primary"/>
                <TextField label="Enter password" variant="outlined" color="primary"/>
                <Button variant="outlined">
                    Create User
                </Button>
            </form>
        </div>
    );
};

export default NewAccountPage;