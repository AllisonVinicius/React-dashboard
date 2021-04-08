import React from 'react';
import { Container, ToogleLabel,ToogleSelector } from './style';




const Toogle: React.FC = () => (
    <Container>
        <ToogleLabel>Ligth</ToogleLabel>
        <ToogleSelector

        checked
        uncheckedIcon= {false}
        checkedIcon={false}
        onChange={() => console.log('mudou')}
        />
        <ToogleLabel>Dark</ToogleLabel>
    </Container>


)


export default Toogle;