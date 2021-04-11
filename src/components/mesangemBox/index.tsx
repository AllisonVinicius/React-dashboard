import React from 'react';

import {Container} from './styleBox';




interface IMsgemBox{
    title: string;
    descricao: string;
    footerTex: string;
    icon: string;
}



const MsgemBox: React.FC<IMsgemBox> = ({title,descricao,footerTex,icon}) => {
    return (
        <Container>
            <header>
                <h1>{title} <img src={icon} alt="{title}" /></h1>                
            </header>
            <p>{descricao}</p>
            <footer>
                <span>{footerTex}</span>
            </footer>
        </Container>
    );
}

export default MsgemBox;