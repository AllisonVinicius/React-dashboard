import React from 'react';
import {Container} from './style';
import ContentHeader from '../../components/contentHeader';

import SelectEntrada from '../../components/SelecEntrada';

const pag_Dash: React.FC = () => {
        
    
    const options = [
        {value: 'Allison', label: 'Allison'},
        {value: 'Vinicus', label: 'vinicus'},
        {value: 'araujo', label: 'araujo'}
    ]

    
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectEntrada options={options} onChange={() => {}} />
            </ContentHeader>
        </Container>
    );
}

export default pag_Dash;