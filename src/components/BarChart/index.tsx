import styled from 'styled-components'
import { LadoDireito, LadoEsquerdo } from '../Pichart/stylePieChart'
import { Container } from './styleBarchart'
import { ResponsiveContainer, BarChart,Bar,Cell, Tooltip} from 'recharts';


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
            </LadoEsquerdo>

            <LadoDireito>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar datakey="valor">
                            {data.map((indicator) => (
                                <Cell
                                    key={indicator.name}
                                    cursor="point"
                                    fill={indicator.color}
                                />
                            ))}
                        </Bar>

                    </BarChart>

                </ResponsiveContainer>
            </LadoDireito>

        </Container>
    );

}

export default BarChartBox;