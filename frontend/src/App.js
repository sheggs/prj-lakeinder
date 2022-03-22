import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserContextProvider from './contexts'
import Routes from './Routes'
import {BrowserRouter} from 'react-router-dom';
import  history from './history'
import {ThemeProvider } from '@material-ui/core';
import extras from './extras/styles'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import theme from './extras/ThemeProvider'


function App() {
  return (
    <ThemeProvider theme={theme}>
    <UserContextProvider>
        <BrowserRouter history={history}>
          <Routes />
        </BrowserRouter>
    </UserContextProvider>
    </ThemeProvider>


  );
}

export default App;
