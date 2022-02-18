import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './hooks/theme';
import Routes from './routes';
import GlobalStyles from './styles/GlobalStyles';
import dark from './styles/themes/dark';





const App: React.FC = () => {
    const {theme} = useTheme();
    
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyles/>
            <Routes/>
        </ThemeProvider>    
        
    );
}

export default App;