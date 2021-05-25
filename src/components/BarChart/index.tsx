import styled from 'styled-components'
import { LadoDireito, LadoEsquerdo,Legend,LegendContainer } from '../Pichart/stylePieChart'
import { Container } from './styleBarchart'
import {ResponsiveContainer, BarChart,Bar,Cell, Tooltip} from 'recharts';
import FormatValor from '../../utils/formatarValores';

interface IBarChartProps {
    
    titulo: string;
    data: {
        name: string;
        valor: number;
        percent: number;
        color: string;
    }[],
}

export const  BarChartBox: React.FC<IBarChartProps> = ({
    titulo, data
}) => {
    return (
        <Container>
            <LadoEsquerdo>
                <h2> {titulo}</h2>
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
                    <BarChart data={data}>
                        <Bar dataKey="valor">
                            {
                                data.map((indicator) => (
                                    <Cell
                                        key={indicator.name}
                                        fill={indicator.color}
                                        
                                    />
                                ))
                            }
                        </Bar>
                        

                    </BarChart>
                </ResponsiveContainer>
            </LadoDireito>

        </Container>
    );

}

export default BarChartBox;