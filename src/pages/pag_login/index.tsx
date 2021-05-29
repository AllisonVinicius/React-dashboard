import React from 'react';

import {Container,Logo, Form,FormTitle} from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';

const pag_login: React.FC = () => {
    return (

        <Container>           
            <Logo>
                <img src= {logoImg} alt="Dashboard"/>
                <h2>Dashboard</h2>
            </Logo>
                <Form onSubmit= {() => {}}>
                    <FormTitle>Entre</FormTitle>
                   
                    <Input
                        type="email"
                        placeholder="e-mail"
                        required
                    />
                    <Input
                    type="password"
                    placeholder="senha"
                    required
                    />
                        <button type="submit">Entrar</button>
                </Form>               
            
        </Container>
 
    
    );
    
}

export default pag_login;