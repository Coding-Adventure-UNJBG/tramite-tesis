import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/navigation' element={<Navigation />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
