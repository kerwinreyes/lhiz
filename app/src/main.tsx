import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { StyledEngineProvider } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>,
)
