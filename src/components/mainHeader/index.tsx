import React, {useMemo,useState} from 'react';
import Toogle from '../Toogle';

import { Container,Profile, Welcome, UserName } from './styles';
import {useTheme} from '../../hooks/theme';

const mainHeader: React.FC = () => {
    const {alterarTheme, theme} = useTheme();
    const [darkTheme],setDarkTheme] = useState(() => theme.title === 'dark' ? true: false);
    return (
        <Container>
            <Toogle           
            />

            <Profile>
                <Welcome>Olá!</Welcome>
                <UserName>Araujo</UserName>
            </Profile>
        </Container>
    );
}

export default mainHeader;

