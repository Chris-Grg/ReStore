import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import {Outlet} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useStoreContext } from '../context/StoreContext';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { getCookie } from '../util/util';

const App = () => {
  const {setBasket} = useStoreContext();
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    const buyerId= getCookie('buyerId');
    if (buyerId!==undefined) {
      agent.Basket.get()
        .then(basket=>setBasket(basket))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false))
    } else{
      setLoading(false)
    }
  },[setBasket])

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

  if (loading) return <LoadingComponent message='Initialising app...'/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;


