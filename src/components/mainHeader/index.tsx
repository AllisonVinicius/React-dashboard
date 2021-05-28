import React, {useMemo,useState} from 'react';
import Toogle from '../Toogle';

import { Container,Profile, Welcome, UserName } from './styles';
import {useTheme} from '../../hooks/theme';

const mainHeader: React.FC = () => {
    const {alterarTheme, theme} = useTheme();
    const [darkTheme,setDarkTheme]= useState(() => theme.title === 'dark' ? true: false);
    
    
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        alterarTheme();
    }
    return (
        <Container>
            <Toogle    
                labelLeft="light"
                labelRight="Darl=k"
                checked={darkTheme}       
                onChance={handleChangeTheme}
            />

            <Profile>
                <Welcome>Olá!</Welcome>
                <UserName>Araujo</UserName>
            </Profile>
        </Container>
    );
}

export default mainHeader;

