import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Show from '../pages/List';




const AppRoutes: React.FC = () => (
        <Layout>
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/pag_Show/:type" exact component={Show} />   
        
            </Switch>
        </Layout>    
);

export default AppRoutes;