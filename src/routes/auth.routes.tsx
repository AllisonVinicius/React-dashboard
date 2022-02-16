import React from 'react';
import { Route, Switch } from 'react-router-dom';
import login from '../pages/SignIn';




const AuthRoutes: React.FC = () => (
    <Switch>
        <Route component={login}/>
    </Switch>

);


export default AuthRoutes;