import './App.css'
import { CurrencyTable } from './components'
import { ExchangeForm } from './components/ExchangeForm'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <ExchangeForm />
        <CurrencyTable />
      </div>
    </div>
  )
}

export default App
