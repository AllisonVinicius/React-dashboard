import React from 'react';

import {Container,Logo, Form,FormTitle} from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/input';
import Button from '../../components/Button';

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
                     <Button type="submit">Entrar</Button>
                     
                </Form>               
            
        </Container>
 
    
    );
    
}

export default pag_login;