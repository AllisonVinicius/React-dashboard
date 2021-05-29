import React from 'react';

import {Switch, Route} from 'react-router-dom'; 

import login from '../pages/pag_login';


const AuthRoutes: React.FC = () => (
    <Switch>
        <Route component={login}/>
    </Switch>

);