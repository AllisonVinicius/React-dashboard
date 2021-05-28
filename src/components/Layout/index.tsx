import React from 'react';

import { GridLayout } from './styles';

import MainHeader from '../mainHeader';
import Menu from '../Menu';
import Content from '../Content';



const Layout: React.FC = ({children}) => (
        <GridLayout>
            <MainHeader />
            <Menu />
            <Content>
                {children}
            </Content>
        </GridLayout>
    );


export default Layout;