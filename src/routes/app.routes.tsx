import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from '../components/Layout';

import Dashboard from '../pages/pag_Dash';
import Show from '../pages/pag_Show';


const AppRoutes: React.FC = () => (
        <Layout>
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/pag_Show/:type" exact component={Show} />   
        
            </Switch>
        </Layout>    
);

export default AppRoutes;