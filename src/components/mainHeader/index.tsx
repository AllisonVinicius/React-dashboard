import React from 'react';
import Toogle from '../Toogle';

import { Container,Profile, Welcome, UserName } from './styles';


const mainHeader: React.FC = () => {

    return (
        <Container>
            <Toogle/>

            <Profile>
                <Welcome>Olá!</Welcome>
                <UserName>Araujo</UserName>
            </Profile>
        </Container>
    );
}

export default mainHeader;

