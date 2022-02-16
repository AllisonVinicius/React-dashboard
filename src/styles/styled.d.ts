import 'styled-components';

/** component que recebe a  string com as cores do theme proposto */
declare module 'styled-components'{
    export interface DefaultTheme{

        title: string;

        colors: {
            primary: string;
            secundary: string;
            tertiary: string;
    
    
            white:string;
            black: string;
            gray: string;
    
            success: string;
            info: string;
            warning: string;
    
        },
    };
    
}