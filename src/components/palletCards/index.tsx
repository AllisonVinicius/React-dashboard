
import React,{useMemo} from 'react';


import cifrao from '../../assets/cifrao.svg';
import setaCima from '../../assets/setaCima.svg';
import setaBaixo from '../../assets/setaBaixo.svg';

import {Container } from './styledCards';

interface IpalletCards { 
    //interface com caracteristicas do Cards
    title: string;
    valor: number;
    avisoLabel: string;
    icon: 'cifrao' | 'setaCima' | 'setaBaixo';
    color: string;
}



const PalletCards: React.FC<IpalletCards> = ({
    title,valor,avisoLabel,icon,color
}) => {

    const iconSelecionado = useMemo(() => { //funcao verifica o icone dos cards, guarda o estado
        switch(icon){
            case 'cifrao':
                return cifrao;
            case 'setaBaixo':
                return setaBaixo;
            case 'setaCima':
                return setaCima;
            default:
                return undefined;
            
        }
    },[icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>{valor}</h1>
            <small>{avisoLabel}</small>
            {<img src = {iconSelecionado} alt={title} />}
          
        </Container>
    );
}

export default PalletCards;