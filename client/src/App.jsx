import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/ProtectedRoutes'

import HomePage from './pages/HomePage'
import PortafolioPage from './pages/Portafolio/PortafolioPage'
import TesisPage from './pages/Tesis/TesisPage'
import TramitePage from './pages/Tramite/TramitePage'
import NotFoundPage from './pages/NotFoundPage'
import NewTramitePage from './pages/Tramite/NewTramitePage'
import UploadFile from './pages/UploadFile'
import UsersPage from './pages/Usuario/UsersPage'
import ViewUserPage from './pages/Usuario/ViewUserPage'
import RegisterPage from './pages/Usuario/RegisterPage'
import UserFormPage from './pages/Usuario/UserFormPage'
import NewSolicitudPage from './pages/Solicitud/NewSolicitudPage'
import SolicitudPage from './pages/Solicitud/SolicitudPage'
import { TramiteProvider } from './context/TramiteContext'
import ComitePage from './pages/Comite/ComitePage'
import ObservacionesPage from './pages/Solicitud/ObservacionesPage'
import { TesisProvider } from './context/TesisContext'
import TesisObservacionesPage from './pages/Tesis/ObservacionesPage'

function App() {
  return (
    <AuthProvider>
      <TramiteProvider>
        <TesisProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/test' element={<NewTramitePage />} />

              <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/portafolio' element={<PortafolioPage />} />
                <Route path='/tramite' element={<TramitePage />} />
                <Route path='/tramite/new' element={<NewTramitePage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route path='/usuario' element={<UsersPage />} />
                <Route path='/usuario/new' element={<UserFormPage />} />
                <Route path='/usuario/view/:id' element={<ViewUserPage />} />
                <Route path='/usuario/edit/:id' element={<UserFormPage />} />

                <Route path='/solicitud' element={<SolicitudPage />} />
                <Route path='/solicitud/view' element={<ObservacionesPage />} />

                <Route path='/tesis' element={<TesisPage />} />
                <Route path='/tesis/view' element={<TesisObservacionesPage />} />

                <Route path='/comite' element={<ComitePage />} />

                <Route path='/reporte' element={<h1>Aqui los reportes</h1>} />
                {/* de momento por aqui para probar */}
                <Route path='/upload' element={<UploadFile />} />
              </Route>
              <Route path='*' element={<NotFoundPage />}></Route>
            </Routes>
          </BrowserRouter>
        </TesisProvider>
      </TramiteProvider>
    </AuthProvider>
  )
}

export default App
