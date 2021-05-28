import React from 'react';
import { Container, ToogleLabel,ToogleSelector } from './style';


interface IToogleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChance(): void;
}

const Toogle: React.FC<IToogleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChance
}) => (
    <Container>
        <ToogleLabel>{labelLeft}</ToogleLabel>
        <ToogleSelector

        checked = {checked}
        uncheckedIcon= {false}
        checkedIcon={false}
        onChange={onChance}
        />
        <ToogleLabel>{labelRight}</ToogleLabel>
    </Container>


)


export default Toogle;