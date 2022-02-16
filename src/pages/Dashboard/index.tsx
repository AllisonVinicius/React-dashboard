import React, { useCallback, useMemo, useState } from 'react';
import ganho from '../../arquivosEntradaTeste/ganho';
import gastosTeste from '../../arquivosEntradaTeste/gastosTeste';
import happy from '../../assets/happy.svg';
import Neutral from '../../assets/neutral.svg';
import triste from '../../assets/triste.svg';
import BarChart from '../../components/BarChart';
import ContentHeader from '../../components/contentHeader';
import HistoryBox from '../../components/HistoryBox';
import MsgemBox from '../../components/mesangemBox';
import PalletCards from '../../components/palletCards';
import PiChart from '../../components/Pichart';
import SelectEntrada from '../../components/SelecEntrada';
import ListaMeses from '../../utils/meses';
import { Container, Content } from './style';









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
        }else if (totalGanhos ===   0 && totalGastos === 0 ) {
            return {
                title: "Ops",
                descricao:"Nao divida nem sobrou" ,
                footerTex:"Toma cuidado!",
                 icon: Neutral
            }
              
        
       }else if (balancoTotal === 0){
            return {
                title: "Sua carteira positiva",
                descricao:"Nao divida nem sobrou" ,
                footerTex:"Toma cuidado!",
                icon: happy
            }
        }
        else {
            return {
                title: "Muito bem!",
                descricao: "Continue assim",
                footerTex: "invista",
                icon: happy

            }
        }

    },[balancoTotal,totalGanhos,totalGastos]);



    const diferencyEntradasSaidas = useMemo(() => {
        const total = totalGanhos + totalGastos;
        const percentualGanhos = Number(((totalGanhos / total) * 100).toFixed(1));
        const percentualGastos = Number(((totalGastos / total) * 100).toFixed(1));

        const data = [
            {
                name: "Entradas",
                valor: totalGanhos,
                percent: percentualGanhos ? percentualGanhos : 0,
                color: '#0000CD'
            },{

                name: "Saídas",
                valor: totalGastos,
                percent: percentualGastos ? percentualGastos : 0,
                color: '#DC143C'
            },
        ];


        return data;
    },[totalGanhos,totalGastos]);


    const historyData = useMemo(() => {
        return ListaMeses.map((_, mes) => {

            let  resultadoEntrada = 0;
            ganho.forEach(gain => {
                const date = new Date(gain.date);
                const gainMes = date.getMonth();
                const gainYear = date.getFullYear();

                if(gainMes === mes && gainYear === anosSelect){
                    try{
                        resultadoEntrada += Number(gain.valor);
                    }catch{
                        throw new Error("Valor invalido");
                    }
                }

            });


            let  resultadoSaida = 0;
            gastosTeste.forEach(gasto => {
                const date = new Date(gasto.date);
                const gastoMes = date.getMonth();
                const gastoYear = date.getFullYear();

                if(gastoMes === mes && gastoYear === anosSelect){
                 try{
                    resultadoSaida += Number(gasto.valor);
                }catch{
                    throw new Error("Valor invalido");
                 }
                }

            });    

            return {
                mesNumber: mes,
                mes: ListaMeses[mes].substr(0,3),
                resultadoEntrada,
                resultadoSaida
            }

        })
        .filter(item =>  {
            const mesAtual = new Date().getMonth();
            const anoAtual = new Date().getFullYear();


            return (anosSelect === anoAtual && item.mesNumber <= mesAtual) || (anosSelect < anoAtual)           
        });
    
    },[anosSelect]);
    
    const relationDepesas = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;
        
        gastosTeste.filter((expense) =>{
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === mesSelect && year === anosSelect;

        })
        .forEach((expense) => {
            if(expense.frequencia === 'recorrente'){
                return amountRecurrent+= Number(expense.valor);            
            }
            if (expense.frequencia === 'eventual'){
                return amountEventual += Number(expense.valor);
            }
        });
        const total = amountRecurrent + amountEventual;
        const percentFrequente = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));
 
        return [
            {
                name: 'Recorrente',
                valor: amountRecurrent,
                percent: percentFrequente ? percentFrequente : 0,
                color: "#0000CD"
            },
            {
                name: 'Eventual',
                valor: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#DC143C"
            }
        ];

    },[mesSelect,anosSelect]);



    const relationGanhos = useMemo(() => {
        let valorRecurrent = 0;
        let valorEventual = 0;
        
        ganho.filter((ganho) =>{
            const date = new Date(ganho.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === mesSelect && year === anosSelect;

        })
        .forEach((ganho) => {
            if(ganho.frequencia === 'recorrente'){
                return valorRecurrent += Number(ganho.valor);            
            }
            if (ganho.frequencia === 'eventual'){
                return valorEventual += Number(ganho.valor);
            }
        });
        const total = valorRecurrent + valorEventual;
        const percentFrequente = Number(((valorRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((valorEventual / total) * 100).toFixed(1));
 
      
        return [
            {
                name: 'Recorrente',
                valor: valorRecurrent,
                percent: percentFrequente ? percentFrequente : 0,
                color: "#0000CD"
            },
            {
                name: 'Eventuais',
                valor: valorEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#DC143C"
            }
        ];

    },[mesSelect,anosSelect]);



    const handMesSelecionado = useCallback((mes: string) => { //use calback memoriiza funcao
        //funcao recebe o mes em string e convete p/numero;
        try{
            const parseMes = Number(mes);
            setSelectMes(parseMes);
        }
        catch(error){
            throw new  Error('valor invalido de mes');
        }
    },[]);

    const handAnoSelecionado = useCallback((mes: string) => {
        //funcao recebe o ano em string e convete p/numero;
        try{
            const parseAno = Number(mes);
            setSelectAno(parseAno);
        }
        catch(error){
            throw new  Error('valor invalido de Ano');
        }
    },[]);

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
                    color= '#3d0936'
                />

                <PalletCards
                    title="Entrada"
                    valor ={totalGanhos}
                    avisoLabel="atualizado basrado nas entradas"              
                    icon="setaCima"
                    color= '#0000CD'
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

                <PiChart data={diferencyEntradasSaidas} />

                <HistoryBox 
                    data={historyData} 
                    lineColorResultadoEntrada="#0000CD"
                    lineColorResultadoSaida="#DC143C"
                />
                {/* grafico de barras */}
                <BarChart 
                    titulo="Saidas"
                    data={relationDepesas}
                />

                <BarChart 
                    titulo="Entradas"
                    data={relationGanhos}
                />           
            </Content>
        </Container>
    );
}


export default Dashboard;