
import Catalog from '../../features/catalog/Catalog.';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
// import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

const App = () => {
  const [darkMode, setDarkMode]=useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType==='light'? "#eaeaea" : '#121212'
      }
    }
  });
  const handleThemeChange = ()=>{
    setDarkMode(!darkMode)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;

