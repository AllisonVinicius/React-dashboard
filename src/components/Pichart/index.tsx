import React from 'react';

import {PieChart, Pie,Cell,ResponsiveContainer} from 'recharts'; //importacao para grafico


import {Container,LadoEsquerdo,Legend,LegendContainer, LadoDireito } from './stylePieChart';

interface IPieProps {
    verify: {
        name: string;
        valor: number;
        percent: number;
        color: string;
    }[];
}

const PiChart: React.FC<IPieProps> = ({verify}) => (
        <Container>
            <LadoEsquerdo>
                <h2>Relacão</h2>
                <LegendContainer>
                    { 
                        verify.map( p => (    
                            <Legend key={p.name} color={p.color}>
                                <div>{p.percent}</div>
                                <span>{p.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </LadoEsquerdo>
            
            <LadoDireito>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data = {verify} dataKey= "percent"> 
                            {//grafico de pizza!
                                verify.map((p) => ( //percorre as celula do grafico
                                    <Cell key = {p.name} fill = {p.color} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </LadoDireito>
       </Container>
    );

export default PiChart;