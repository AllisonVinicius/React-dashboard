import React from 'react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Legend, LegendContainer, SideLeft, SideRight } from '../PieChartBox/stylePieChart';
import { Container } from './styleBarchart';
interface IBarChartProps {
    
    title: string;
    data: {
        name: string;
        amount: number;
        percent: number;
        color: string
    }[],
}

const BarChartBox: React.FC<IBarChartProps> = ({
    title, data
}) => (
    <Container>
            
            <SideLeft>
                <h2> {title}</h2>
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
                    <BarChart data={data}>
                    <Bar dataKey="amount" name="Valor">
                            {
                                data.map((indicator) => (
                                    <Cell
                                        key={indicator.name}
                                        fill={indicator.color}
                                        cursor="pointer"
                                        
                                    />
                                ))
                            }
                        </Bar>
                         <Tooltip 
                             cursor={{fill: 'none'}}
                            // formatter={(value) => formatCurrency(Number(value))} 
                        />            
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>

    
        </Container>
    );



export default BarChartBox;