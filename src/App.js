import './App.css';
import Header from './components/Header/Header';
import {createTheme, ThemeProvider, responsiveFontSizes} from "@mui/material";
import {ThemeProvider as TP} from 'styled-components';
import Navigator from "./components/Navigator";


const theme = createTheme({})

const responsiveTheme = responsiveFontSizes(theme)

function App() {
    return (
        <TP theme={responsiveTheme}>
            <ThemeProvider theme={responsiveTheme}>
                <Header/>
                <Navigator/>
            </ThemeProvider>
        </TP>
    );
}

export default App;
