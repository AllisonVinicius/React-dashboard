import React, {useState,useMemo} from 'react';
import {Container} from './style';
import ContentHeader from '../../components/contentHeader';
import ganho from '../../arquivosEntradaTeste/ganho';
import gastosTeste from '../../arquivosEntradaTeste/gastosTeste'
import SelectEntrada from '../../components/SelecEntrada';
import ListaMeses from '../../utils/meses';



const Dashboard: React.FC = () => {

    const [mesSelect, setSelectMes] = useState<number>(new Date().getMonth() + 1);
    const [anosSelect, setSelectAno] = useState<number>(new Date().getFullYear());
        
    
    const options = [
        {value: 'Allison', label: 'Allison'},
        {value: 'Vinicus', label: 'vinicus'},
        {value: 'araujo', label: 'araujo'}
    ];


         
    const pAnos = useMemo(() => {
        let receivedAnos: number[] = [];

       [...gastosTeste, ...ganho].forEach(item => {
            const date = new Date(item.date);
            const vAnos = date.getFullYear();


            if(!receivedAnos.includes(vAnos)){
                receivedAnos.push(vAnos);
            }
        });

        return receivedAnos.map(vAnos => {
            return {
                value:vAnos,
                label:vAnos,
            }
        });
    },[]);
    

    const pMeses = useMemo(() => {
        
        return ListaMeses.map((meses,index) => {
            return {
                value: index +1,
                label: meses,
            }
        });
        
    },[]);


    const handMesSelecionado = (mes: string) => {
        //funcao recebe o mes em string e convete p/numero;
        try{
            const parseMes = Number(mes);
            setSelectMes(parseMes);
        }
        catch(error){
            throw new  Error('valor invalido de mes');
        }
    }

    const handAnoSelecionado = (mes: string) => {
        //funcao recebe o ano em string e convete p/numero;
        try{
            const parseAno = Number(mes);
            setSelectAno(parseAno);
        }
        catch(error){
            throw new  Error('valor invalido de Ano');
        }
    }

    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectEntrada options={pMeses}  onChange={(e) => handMesSelecionado(e.target.value)} defaultValue={mesSelect}/>
                <SelectEntrada options={pAnos} onChange={(e) => handAnoSelecionado(e.target.value)} defaultValue={anosSelect}/>
            </ContentHeader>
        </Container>
    );
}

export default Dashboard;