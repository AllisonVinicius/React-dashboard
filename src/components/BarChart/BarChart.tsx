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
    }
}

export const  BarChartBox: React.FC<IBarChartProps> = ({
    titulo, data
}) => {
    return (
        <Container>
            <LadoDireito>
                <h2> {titulo}</h2>

            </LadoDireito>
            <LadoEsquerdo>

            </LadoEsquerdo>

        </Container>
    );

}

export default BarChartBox;