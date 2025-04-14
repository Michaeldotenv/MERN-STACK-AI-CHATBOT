import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createTheme, ThemeProvider} from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom';

const theme = createTheme({
  typography:{
    fontFamily : "Roboto Slab, serif",
    allVariants : {color : "white"}
  }
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    < HashRouter >
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </HashRouter >
  </StrictMode>,
)
