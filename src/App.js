import { MuiThemeProvider, createTheme } from '@material-ui/core';
import './App.css';
import RouteContainer from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import axios from './services/axios';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  typography: {
   "fontFamily": `Poppins`,
  }
});


function App() {
  const isAuthenticated = useRef(false);
  const getToken = () => {
    return localStorage.getItem("token");
}

useEffect(()=>{
    const token = getToken();
    if(token)
    {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      isAuthenticated.current = true;
    }
    else
    {
      isAuthenticated.current = false;
    }
},[])
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <RouteContainer 
            isAuthenticated={isAuthenticated} 
          />
        </BrowserRouter>
      <ToastContainer />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
