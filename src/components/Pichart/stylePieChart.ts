import styled from 'styled-components';


interface ILegendPropriedades{
    color: string;
}



export const Container = styled.div`
    width: 48%;
    height: 260px;
    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

`;


export const LadoEsquerdo  = styled.aside`
    padding: 30px 20px;
    
    > h2{
        margin-bottom: 20px;
    }

`;

export const Legend  = styled.li<ILegendPropriedades>`
    display: flex;
    align-items: center;
    margin-bottom: 7px;
    
    > div {
        background-color: ${prosp => prosp.color};
        width: 40px;
        height: 40px;
        border-radius: 3px;
        font-size: 19px;
        line-height: 40px;
        text-align: center;

    }

    > span {
        margin-left: 5px;
    }
`;


export const LegendContainer  = styled.ul`
    list-style: none;
    overflow-y: scroll;
    height: 175px;
    padding-right: 15px;

    ::-webkit-scrollbar{
        width: 10px;
    }

        ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secundary};
        border-radius: 10px;

    }


::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.tertiary};

    }

`;

export const LadoDireito = styled.main``;