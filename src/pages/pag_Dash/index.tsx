import React, {useState,useMemo} from 'react';
import {Container,Content} from './style';
import ContentHeader from '../../components/contentHeader';

import ganho from '../../arquivosEntradaTeste/ganho';
import gastosTeste from '../../arquivosEntradaTeste/gastosTeste';

import SelectEntrada from '../../components/SelecEntrada';
import ListaMeses from '../../utils/meses';

import PalletCards from '../../components/palletCards';

import MsgemBox from '../../components/mesangemBox';

import happy from '../../assets/happy.svg';
import triste from '../../assets/triste.svg';

import Neutral from '../../assets/neutral.svg';

import PiChart  from '../../components/Pichart';

import HistoryBox from '../../components/historyBox';

const Dashboard: React.FC = () => {
    const [mesSelect, setSelectMes] = useState<number>(new Date().getMonth() + 1);
    const [anosSelect, setSelectAno] = useState<number>(new Date().getFullYear());
        
    
  
         
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

    const totalGanhos = useMemo (() => {
        let total: number = 0;

        ganho.forEach(item => {
            const date = new Date(item.date);
            const ano = date.getFullYear();
            const mes = date.getMonth() + 1;
       
            if(mes === mesSelect && ano === anosSelect){
                try{
                    total += Number(item.valor)
                }catch{
                    throw new Error('Invado Valor');
                }
            }
        });

        return total;


    },[mesSelect,anosSelect]);



    const totalGastos = useMemo (() => {
        let total: number = 0;

        gastosTeste.forEach(item => {
            const date = new Date(item.date);
            const ano = date.getFullYear();
            const mes = date.getMonth() + 1;
       
            if(mes === mesSelect && ano === anosSelect){
                try{
                    total += Number(item.valor)
                }catch{
                    throw new Error('Invado Valor');
                }
            }
        });

        return total;


    },[mesSelect,anosSelect]);


    const balancoTotal = useMemo (() => {
       return totalGanhos - totalGastos;

    },[totalGanhos,totalGastos]);


    const msgemStatus = useMemo (() => { //funcao para retornar o status de acorda com o valores do mes
        if (balancoTotal < 0){
            return {
                title: "Que triste",
                descricao:"Gastou muitoo dinheiro filho" ,
                footerTex:"Planeje Melhor",
                 icon: triste
              
            }
        }else if (balancoTotal ===   0) {
            return {
                title: "Na medida do possiveel",
                descricao:"Nao divida nem sobrou" ,
                footerTex:"Toma cuidado!",
                 icon: Neutral
            }
              
        
       }else{
            return {
                title: "Sua carteira positiva",
                descricao:"Nao divida nem sobrou" ,
                footerTex:"Toma cuidado!",
                icon: happy
            }
        }

    },[balancoTotal]);



    const diferencyEntradasSaidas = useMemo(() => {
        const total = totalGanhos + totalGastos;
        const percentualGanhos = (totalGanhos / total) * 100;
        const percentualGastos = (totalGastos / total) * 100;

        const data = [
            {
                name: "Entradas",
                valor: totalGastos,
                percent: Number(percentualGanhos.toFixed(1)),
                color: '#E44C4E'
            },{

                name: "Saídas",
                valor: totalGastos,
                percent: Number(percentualGastos.toFixed(1)),
                color: '#F7931B'
            },
        ];


        return data;
    },[totalGanhos,totalGastos]);


    const historyData = useMemo(() => {
        return ListaMeses.map((_,mes) => {
            let  resultEntrada = 0;
            ganho.forEach(gain => {
                const data = new Date(gain.date);
                const gainMes = data.getMonth();
                const gainYear = data.getFullYear();

                if(gainMes === mes && gainYear === anosSelect){
                 try{
                    resultEntrada += Number(gain.valor);
                }catch{
                    throw new Error("Valor invalido");
                 }
                }

            });


            let  resultSaida = 0;
            gastos.forEach(gasto => {
                const data = new Date(gasto.date);
                const gastoMes = data.getMonth();
                const gastoYear = data.getFullYear();

                if(gastoMes === mes &&gastoYear === anosSelect){
                 try{
                    resultEntrada += Number(gasto.valor);
                }catch{
                    throw new Error("Valor invalido");
                 }
                }

            });    


        })
    
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
            <Content>
                <PalletCards
                    title="Saldo"
                    valor ={balancoTotal}
                    avisoLabel="atualizado basrado nas entradas"              
                    icon="cifrao"
                    color= '#10b834'
                />

                <PalletCards
                    title="Entrada"
                    valor ={totalGanhos}
                    avisoLabel="atualizado basrado nas entradas"              
                    icon="setaCima"
                    color= '#ED1'
                />

                <PalletCards
                    title="Saída"
                    color= '#DC143C'
                    valor ={totalGastos}
                    avisoLabel="atualizado basrado nas saidas"              
                    icon="setaBaixo"
                />

                <MsgemBox  
                    title={msgemStatus.title} 
                    descricao={msgemStatus.descricao}
                    footerTex={msgemStatus.footerTex}
                    icon={msgemStatus.icon}
                />

                <PiChart data={diferencyEntradasSaidas}/>
                <HistoryBox 
                    data={} 
                    lineColorResultadoEntrada={}
                    lineColorResultadoSaida={} 
                />


            </Content>
        </Container>
    );
}


export default Dashboard;