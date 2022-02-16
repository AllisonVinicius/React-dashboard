import React from 'react';
import logoImg from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/input';
import { Container, Form, FormTitle, Logo } from './styles';


const SignIn: React.FC = () => {
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

export default SignIn;