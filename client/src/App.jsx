import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'

import HomePage from './pages/HomePage'
import PortafolioPage from './pages/PortafolioPage'
import TesisPage from './pages/TesisPage'
import TramitePage from './pages/Tramite/TramitePage'
import NotFoundPage from './pages/NotFoundPage'
import NewTramitePage from './pages/Tramite/NewTramitePage'
import UploadFile from './pages/UploadFile'
import UsersPage from './pages/Usuario/UsersPage'
import ViewUserPage from './pages/Usuario/ViewUserPage'
import EditUserPage from './pages/Usuario/EditUserPage'
import RegisterPage from './pages/Usuario/RegisterPage'

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
            <Route path='/tramite/new' element={<NewTramitePage />} />
            <Route path='/tesis' element={<TesisPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/usuario' element={<UsersPage />} />
            <Route path='/usuario/new' element={<RegisterPage />} />
            <Route path='/usuario/view/:id' element={<ViewUserPage />} />
            <Route path='/usuario/edit/:id' element={<EditUserPage />} />
            {/* de momento por aqui para probar */}
            <Route path='/upload' element={<UploadFile />} />
          </Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
