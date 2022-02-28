
import React, { useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';
//componentes
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectEntrada from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
//arquivos uteis
import formatarValores from '../../utils/formatarValores';
import listOfMonths from '../../utils/months';
import { Container, Content, Filters } from './styles';




interface IRouteParams{
    match:{
        params: {
            type: string;
        }
    }
}

interface IData{
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;
}

const List: React.FC<IRouteParams> = ({match}) => {
/**filtros de informacoes */
const [data, setData] = useState<IData[]>([]);
const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
const [frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente', 'eventual']);
  
    
    const  movimentType  = match.params;

    const pageData = useMemo(() => {
        return  movimentType === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#0000CD',
                data: gains

            }:{
                title: 'Saídas',
                lineColor: '#DC143C',
                data: expenses        
        }
    },[movimentType]);

     
    const years = useMemo(() => {
        let uniqueYears: number[] = [];

        const { data } = pageData;

          data.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();


            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);

            }

        });

        return uniqueYears.map(year => {
            return {
                value:year,
                label:year,
            }
        });
    },[pageData]);
    

    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });
    },[]);



    const handleFrequencyClick = (freq: string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === freq);

        if(alreadySelected >= 0){
            const filtro = frequencyFilterSelected.filter(p => p !== freq);
            setFrequencyFilterSelected(filtro);
        }else{
            setFrequencyFilterSelected((prev) => [...prev, freq]);//selecao dp estado anterior, filtros anteriores
            }
    }   

    const handleMonthSelected = (month: string) => {
        //funcao recebe o mes em string e convete p/numero;
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        }
        catch{
            throw new Error('invalid month value. Is accept 0 - 24.')
        }
    }
 
 
 
    const handleYearSelected = (year: string) => {
        //funcao recebe o ano em string e convete p/numero;
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        }
        catch{
            throw new Error('invalid year value. Is accept integer numbers.')
        }
    }


    useEffect(() => {
        const {data} = pageData;
       const dataFiltrada =  data.filter(item => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
       });
        
       const formattedData = dataFiltrada.map(item => {              
            return {
                id: uuid(),
                descricao: item.description,
                valor: formatarValores(Number(item.amount)),
                frequencia: item.frequency,
                dataFormat: formatarData(item.date),
                tagColor: item.frequency === 'recorrente' ? '#0000CD' : '#DC143C',
        
            } 
        });
        setData(formattedData);
    },[pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected]);

    return (
        <Container>
             <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectEntrada options={months}  onChange={(e) =>  handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectEntrada options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <button type="button" className= {`tag-filter tag-filter-recurrent ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}  
                onClick={() => handleFrequencyClick('recorrente')}>
                    Previstos
                </button>

                <button type="button" className={`tag-filter tag-filter-eventual ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}  
                 onClick={() => handleFrequencyClick('eventual')}>
                    Não Previstos
                </button>

            </Filters>

            <Content>
                {
                    data.map(acess => (
                        <HistoryFinanceCard  
                            key={acess.id}
                            tagColor={acess.tagColor} /**cor da borda dos itens */
                            title={acess.description}
                            subTitle={acess.dateFormatted}
                            amount={acess.amountFormatted}                
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default List;