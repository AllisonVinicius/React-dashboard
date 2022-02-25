
import React, { useEffect, useMemo, useState } from 'react';
import { uuid } from 'uuidv4';
//componentes
import ContentHeader from '../../components/ContentHeader';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import SelectEntrada from '../../components/SelectInput';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import formatarData from '../../utils/formatarData';
//arquivos uteis
import formatarValores from '../../utils/formatarValores';
import ListaMeses from '../../utils/meses';
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
    const [data,setData] = useState<IData[]>([]);
    const [mesSelect, setSelectMes] = useState<number>(new Date().getMonth() + 1);
    const [anosSelect, setSelectAno] = useState<number>(new Date().getFullYear());
    const [selectFrequencia, setSelecaoFreq] = useState(['recorrente','eventual']);
  
    
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
    

    const pMeses = useMemo(() => {
        
        return ListaMeses.map((meses,index) => {
            return {
                value: index +1,
                label: meses,
            }
        });
        
    },[]);


    const handleFrequencyClick = (freq: string) => {
        const alreadySelected = selectFrequencia.findIndex(item => item === freq);

        if(alreadySelected >= 0){
            const filtro = selectFrequencia.filter(p => p !== freq);
            setSelecaoFreq(filtro);
        }else{
            setSelecaoFreq((prev) => [...prev, freq]);//selecao dp estado anterior, filtros anteriores
            }
    }   

    const handleMonthSelected = (mes: string) => {
        //funcao recebe o mes em string e convete p/numero;
        try{
            const parseMes = Number(mes);
            setSelectMes(parseMes);
        }
        catch(error){
            throw new  Error('valor invalido de mes');
        }
    }

    const handleYearSelected  = (mes: string) => {
        //funcao recebe o ano em string e convete p/numero;
        try{
            const parseAno = Number(mes);
            setSelectAno(parseAno);
        }
        catch(error){
            throw new  Error('valor invalido de Ano');
        }
    }

    useEffect(() => {
        const {data} = pageData;
       const dataFiltrada =  data.filter(item => {
        const date = new Date(item.date);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return month === mesSelect &&  year === anosSelect && selectFrequencia.includes(item.frequencia);
       });
        
       const formattedData = dataFiltrada.map(item => {              
            return {
                id: uuid(),
                descricao: item.descricao,
                valor: formatarValores(Number(item.valor)),
                frequencia: item.frequencia,
                dataFormat: formatarData(item.date),
                tagColor: item.frequencia === 'recorrente' ? '#0000CD' : '#DC143C',
        
            } 
        });
        setData(formattedData);
    },[pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected]);

    return (
        <Container>
             <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectEntrada options={months}  onChange={(e) =>  handleMonthSelected(e.target.value)} defaultValue={mesSelect}/>
                <SelectEntrada options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={anosSelect}/>
            </ContentHeader>

            <Filters>
                <button type="button" className= {`tag-filter tag-filter-recurrent ${selectFrequencia.includes('recorrente') && 'tag-actived'}`}  
                onClick={() => handleFrequencyClick('recorrente')}>
                    Previstos
                </button>

                <button type="button" className={`tag-filter tag-filter-eventual ${selectFrequencia.includes('eventual') && 'tag-actived'}`}  
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