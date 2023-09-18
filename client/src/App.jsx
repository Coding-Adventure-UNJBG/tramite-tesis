import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1 className='font-bold text-3xl'>Home</h1>} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
