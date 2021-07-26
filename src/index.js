import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NewAccountPage from "./NewAccountPage";
import LoginPage from "./LoginPage";

const Index = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/directory/:user_id" exact>
                    <App/>
                </Route>
                <Route path="/create-new-account" exact>
                    <NewAccountPage/>
                </Route>
                <Route path="/">
                    <LoginPage/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

reportWebVitals();