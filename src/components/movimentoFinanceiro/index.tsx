
import React from 'react';

import {Container, Tag } from './styles';

interface ImovimentoFinanceiro {
    
    bordaCartao: string;
    title: string;
    subTitle: string;
    valor: string;


}

const movimentoFinanceiro: React.FC<ImovimentoFinanceiro> = ({
    bordaCartao,
    title,
    subTitle,
    valor

}) => {
    return (
        <Container >
            <Tag color={bordaCartao} />
            <div>
                <span>{title}</span>
                <small>{subTitle}</small>
            </div>
            <h3>{valor}</h3>

        </Container>
    );
}

export default movimentoFinanceiro;