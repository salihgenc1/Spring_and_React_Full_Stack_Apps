import React from 'react';
import './App.css';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import TodoTransactions from './components/todotransactions/TodoTransactions';
import {createTheme,ThemeProvider} from '@mui/material/styles'

function App() {

  const theme = createTheme({
      palette: {
          primary: {
              main: '#1e272e',
          },
          secondary: {
              main: '#57606f',
          },
          success: {
              main: '#2ed573',
          },
          error: {
              main: '#ff4757',
          },
          info: {
              main: '#1e90ff',
          },
      },

      typography: {

          fontFamily: 'Rubik',
      }

    });

  return (
    <div className="Todo">
        <ThemeProvider theme={theme}>
          <Routes>
              <Route path="/" element = {<Layout/>}>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/todotransactions" element={<TodoTransactions/>}/>
              </Route>
          </Routes>
        </ThemeProvider>
    </div>
  );
}

export default App;
