import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ExchangeRateProvider } from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ExchangeRateProvider>
      <App />
    </ExchangeRateProvider>
  </React.StrictMode>
)
