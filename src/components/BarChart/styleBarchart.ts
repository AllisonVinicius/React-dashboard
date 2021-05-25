import styled from 'styled-components'

export const Container = styled.div`
    width: 48%;
    min-height: 260px;
    margin: 10px 0;
    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px;
`;

export const LadoEsquerdo = styled.aside`
    padding: 30px 10px;

    > h2 {
        margin-bottom: 10px
    }

`;
export const LadoDireito = styled.main`
    flex: 1;
`;
