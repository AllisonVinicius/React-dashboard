import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'; //importacao para grafico
import { Container, Legend, LegendContainer, SideLeft, SideRight } from './stylePieChart';




interface IPieChartBox {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

const PieChartBox: React.FC<IPieChartBox> = ({data}) => (
        <Container>
            <SideLeft>
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
            </SideLeft>
            
            <SideRight>
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
            </SideRight>
       </Container>
);

export default PieChartBox;