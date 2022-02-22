import React from 'react';
import { Container } from './styleBox';





interface IMsgemBox{
    title: string;
    description: string;
    footerTex: string;
    icon: string;
}



const MessageBox: React.FC<IMsgemBox> = ({title,description
    ,footerTex,icon}) => {
    return (
        <Container>
            <header>
                <h1>{title} <img src={icon} alt="{title}" /></h1>                
            </header>
            <p>{description}</p>
            <footer>
                <span>{footerTex}</span>
            </footer>
        </Container>
    );
}

export default MessageBox;