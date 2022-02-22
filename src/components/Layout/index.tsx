import React from 'react';
import Aside from '../Aside';
import Content from '../Content';
import MainHeader from '../MainHeader';
import { GridLayout } from './styles';



const Layout: React.FC = ({children}) => (
        <GridLayout>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </GridLayout>
);


export default Layout;