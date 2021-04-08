
import React, { useMemo, useState, useEffect} from 'react';
import {Container, Content, Filters} from './styles';
//componentes
import ContentHeader from '../../components/contentHeader';
import SelectEntrada from '../../components/SelecEntrada';
import MovimentoFinanceiro from '../../components/movimentoFinanceiro';

//arquivos uteis
import formatarValores from '../../utils/formatarValores';
import formatarData from '../../utils/formatarData';
import ListaMeses from '../../utils/meses';
import {uuid} from 'uuidv4';
import ganho from '../../arquivosEntradaTeste/ganho';
import gastosTeste from '../../arquivosEntradaTeste/gastosTeste';



interface IRouteParams{
    match:{
        params: {
            type: string;
        }
    }
}

interface IData{
    id: string;
    descricao: string;
    valor: string;
    frequencia: string;
    dataFormat: string;
    tagColor: string;
}

const Show: React.FC<IRouteParams> = ({match}) => {
/**filtros de informacoes */
    const [data,setData] = useState<IData[]>([]);
    const [mesSelect, setSelectMes] = useState<string>(String(new Date().getMonth() + 1));
    const [anosSelect, setSelectAno] = useState<string>(String(new Date().getFullYear()));
    const [selectFrequencia, setSelecaoFreq] = useState(['recorrente','eventual']);


    const { type } = match.params;

    const title = useMemo(() => {
        return type === 'entrada' ? 'Entradas' : 'Saidas'

    },[type]);


    const lineColor = useMemo(() => {
        return type === 'entrada' ? '#228B22' : '#E44C4E'
    },[type]);


    const listData = useMemo(() =>{
        return type === 'entrada' ? ganho : gastosTeste;

    },[type]);

     
    const pAnos = useMemo(() => {
        let Uanos: number[] = [];

        listData.forEach(item => {
            const date = new Date(item.date);
            const vAnos = date.getFullYear();


            if(!Uanos.includes(vAnos)){
                Uanos.push(vAnos);

            }

        });

        return Uanos.map(vAnos => {
            return {
                value:vAnos,
                label:vAnos,
            }
        });
    },[listData]);
    

    const pMeses = useMemo(() => {
        
        return ListaMeses.map((meses,index) => {
            return {
                value: index +1,
                label: meses,
            }
        });
        
    },[]);


    const botaoFrequenciaClick = (freq: string) => {
        const alreadySelected = selectFrequencia.findIndex(item => item === freq);

        if(alreadySelected >= 0){
            const filtro = selectFrequencia.filter(p => p !== freq);
            setSelecaoFreq(filtro);
        }else{
            setSelecaoFreq((prev) => [...prev, freq]);//selecao dp estado anterior, filtros anteriores
            }
    }   

    useEffect(() => {
       const dataFiltrada =  listData.filter(item => {
        const date = new Date(item.date);
        const mes = String(date.getMonth() + 1);
        const ano = String(date.getFullYear());

        return mes === mesSelect &&  ano === anosSelect && selectFrequencia.includes(item.frequencia);
       });
        
       const dataFormatada = dataFiltrada.map(item => {              
            return {
                id: uuid(),
                descricao: item.descricao,
                valor: formatarValores(Number(item.valor)),
                frequencia: item.frequencia,
                dataFormat: formatarData(item.date),
                tagColor: item.frequencia === 'recorrente' ? '#228B22' : '#E44C4E',
        
            } 
        });
        setData(dataFormatada);
    },[listData,mesSelect,anosSelect, data.length, selectFrequencia]);

    return (
        <Container>
             <ContentHeader title={title} lineColor={lineColor}>
                <SelectEntrada options={pMeses}  onChange={(e) => setSelectMes(e.target.value)} defaultValue={mesSelect}/>
                <SelectEntrada options={pAnos} onChange={(e) => setSelectAno(e.target.value)} defaultValue={anosSelect}/>
            </ContentHeader>

            <Filters>
                <button type="button" className= {`tag-filter tag-filter-recurrent ${selectFrequencia.includes('recorrente') && 'tag-actived'}`}  
                onClick={() => botaoFrequenciaClick('recorrente')}>
                    Previstos
                </button>

                <button type="button" className={`tag-filter tag-filter-eventual ${selectFrequencia.includes('eventual') && 'tag-actived'}`}  
                 onClick={() => botaoFrequenciaClick('eventual')}>
                    Não Previstos
                </button>

            </Filters>

            <Content>
                {
                    data.map(item => (
                        <MovimentoFinanceiro  
                            key={item.id}
                            bordaCartao={item.tagColor} /**cor da borda dos itens */
                            title={item.descricao}
                            subTitle={item.dataFormat}
                            valor={item.valor}                
                        />
                    ))
                }
            </Content>
        </Container>
    );
}

export default Show;