import React from 'react';
import {Container} from './styleBox';
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip} from 'recharts';

const HistoryBox: React.FC = () => (
   
        <Container>
            <h2>Histórico de Saldo</h2>
            <ResponsiveContainer>
                <LineChart data={[]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cece" />
                    <XAxis dataKey="month" stroke="#cece" />
                    <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="amountEntry"
                            name="Entradas"
                            stroke="#77e44c"
                            strokeWidth={5}
                            dot={{r: 5}}
                            activeDot={{r: 8}}
                        />
                        <Line
                            type="monotone"
                            dataKey="amountOutput"
                            name="Saídas"
                            stroke="#E44C4E"
                            strokeWidth={5}
                            dot={{r: 5}}
                            activeDot={{r: 8}}
                        />                        
                </LineChart> 
            </ResponsiveContainer>
        </Container>
    )




export default HistoryBox;