
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Legend, LegendContainer, SideLeft, SideRight } from '../PieChartBox/stylePieChart';
import { Container } from './styleBarchart';


interface IBarChartProps {
    
    titulo: string;
    data: {
        name: string;
        valor: number;
        percent: number;
        color: string;
    }[],
}

const  BarChartBox: React.FC<IBarChartProps> = ({
    titulo, data
}) => (
    
        <Container>
            <SideLeft>
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
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                    <Bar dataKey="valor" name="Valor">
                            {
                                data.map((indicator) => (
                                    <Cell
                                        key={indicator.name}
                                        fill={indicator.color}
                                        cursor = "pointer"
                                        
                                    />
                                ))
                            }
                        </Bar>
                        { <Tooltip 
                            // cursor={{fill: 'none'}}
                            // formatter={(valor) => formatarValores(Number(valor))} 
                        />            }
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>

        </Container>
    );



export default BarChartBox;