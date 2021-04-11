import React from 'react';

//import {PieChart, Pie,Cell,ResponsiveContainer} from 'recharts'; //importacao para grafico


import {Container,LadoEsquerdo,Legend,LegendContainer } from './stylePieChart';

interface IPieProps {
    propriedades: {
        name: string;
        valor: number;
        percent: number;
        color: string;
    }[];
}

const PiChart: React.FC<IPieProps> = ({propriedades}) => (
        <Container>
            <LadoEsquerdo>
                <h2>Relacão</h2>
                <LegendContainer>
                    {
                        propriedades.map( p => (    
                            <Legend key={p.name} color={p.color}>
                                <div>{p.percent}</div>
                                <span>{p.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </LadoEsquerdo>



        </Container>
    );

export default PiChart;