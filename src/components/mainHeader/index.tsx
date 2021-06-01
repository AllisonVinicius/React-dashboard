import React, {useState} from 'react';


import { Container } from './styles';
import {useTheme} from '../../hooks/theme';

const MainHeader: React.FC = () => {
    const {alterarTheme, theme} = useTheme();
    const [darkTheme,setDarkTheme]= useState(() => theme.title === 'dark' ? true: false);
    
    
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        alterarTheme();
    }
    return (
        <Container>
           
        </Container>
    );
}

export default MainHeader;

