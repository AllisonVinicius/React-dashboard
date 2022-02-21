import React from 'react';
import Content from '../Content';
import MainHeader from '../MainHeader';
import Menu from '../Menu';
import { GridLayout } from './styles';





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