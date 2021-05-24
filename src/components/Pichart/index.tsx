import React from 'react';

import {PieChart, Pie,Cell,ResponsiveContainer} from 'recharts'; //importacao para grafico


import {Container,LadoEsquerdo,Legend,LegendContainer, LadoDireito } from './stylePieChart';

interface IPieProps {
    data: {
        name: string;
        valor: number;
        percent: number;
        color: string;
    }[];
}

const PiChart: React.FC<IPieProps> = ({data}) => (
        <Container>
            <LadoEsquerdo>
                <h2>Relação</h2>
                <LegendContainer>
                    { 
                        data.map((p) => (    
                            <Legend key={p.name} color={p.color}>
                                <div>{p.percent}%</div>
                                <span>{p.name}</span>
                            </Legend>
                        ))
                    }
                </LegendContainer>
            </LadoEsquerdo>
            
            <LadoDireito>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data = {data} dataKey= "percent"> 
                            {//grafico de pizza!
                                data.map((p) => ( //percorre as celula do grafico
                                    <Cell key={p.name} fill={p.color} />
                                ))
                            }
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </LadoDireito>
       </Container>
);

export default PiChart;