import React from 'react';
import {Container, ChartContainer, Header, LegendContainer,Legend} from './styleBox';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip} from 'recharts';

import formatData from '../../utils/formatarData'

interface IHistoryBoxProps {
    data: {
        mes: string;
        resultadoEntrada: number;
        resultadoSaida: number;

    }[],
    lineColorResultadoEntrada: string;
    lineColorResultadoSaida: string;
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
    data, lineColorResultadoEntrada, lineColorResultadoSaida

    }) => (
  
        <Container>
            <Header>
                <h2>Histórico de Saldo</h2>
                <LegendContainer>
                    <Legend color={lineColorResultadoEntrada}>
                        <div></div>
                        <span>Entradas</span>
                    </Legend>
             
                    <Legend color={lineColorResultadoSaida}>
                        <div></div>
                        <span>Saida</span>
                    </Legend>
                </LegendContainer>
            </Header>
            <ChartContainer>
                    <ResponsiveContainer>
                        <LineChart data={data} margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                            <XAxis dataKey="mes" stroke="#cecece" />
                        <Tooltip formatter={(value) => formatData(Number(value))}/>
                                <Line
                                    type="monotone"
                                    dataKey="resultadoEntrada"
                                    name="Entradas"
                                    stroke={lineColorResultadoEntrada}
                                    strokeWidth={5}
                                    dot={{r: 5}}
                                    activeDot={{r: 8}}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="resultadoSaida"
                                    name="Saídas"
                                    stroke= {lineColorResultadoSaida}
                                    strokeWidth={5}
                                    dot={{r: 5}}
                                    activeDot={{r: 8}}
                                />                        
                        </LineChart> 
                    </ResponsiveContainer>
            </ChartContainer>                
        </Container>
    )




export default HistoryBox;