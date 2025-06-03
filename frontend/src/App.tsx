import './App.css'
import TableData from './pages/TableData'
import { Toaster } from 'sonner'

function App() {
  return (
    <>
      <TableData />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default App
