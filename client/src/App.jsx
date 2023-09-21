import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'

import HomePage from './pages/HomePage'
import PortafolioPage from './pages/PortafolioPage'
import TesisPage from './pages/TesisPage'
import TramitePage from './pages/TramitePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/portafolio' element={<PortafolioPage />} />
            <Route path='/tramite' element={<TramitePage />} />
            <Route path='/tesis' element={<TesisPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
