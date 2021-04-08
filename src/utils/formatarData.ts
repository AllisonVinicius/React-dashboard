const formatarData = (date: string): string => {
        /**formata data */
        const dateF = new Date(date);
        const dia = dateF.getDate() > 9 ? dateF.getDate() : `0${dateF.getDate()}`;  
        const mes = (dateF.getMonth() + 1) > 9 ? dateF.getMonth() + 1 : `0${dateF.getMonth() + 1}`;
        const ano = dateF.getFullYear();




    return `${dia}/${mes}/${ano}`;
};

export default formatarData;
