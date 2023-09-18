import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1 className='font-bold text-3xl'>Home</h1>} />
        <Route path='/login' element={<h1 className='font-bold text-3xl'>Login</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
