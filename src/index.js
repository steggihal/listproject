import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NewAccountPage from "./NewAccountPage";
import LoginPage from "./LoginPage";
import {UserProvider} from "./Components/UserContext";

const Index = () => {
    return (

        <BrowserRouter>
            <UserProvider>
                <Switch>
                    <Route path="/directory" exact>
                        <App/>
                    </Route>
                    <Route path="/create-new-account">
                        <NewAccountPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/" exact>
                        <h2> Please route to appropriate URL. This is invalid </h2>
                    </Route>
                </Switch>
            </UserProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
);

reportWebVitals();