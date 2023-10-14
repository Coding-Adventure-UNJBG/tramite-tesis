import axios from './axios'

export const getTramitesRequest = () => axios.get('/tramite')
export const saveSolicitudRequest = values => axios.post('/tramite', values)

export const getProfesoresRequest = () => axios.get('/tramite/profesores')
export const saveComitesRequest = values => axios.post('/tramite/comite', values)
export const getComitesRequest = () => axios.get('/tramite/comite')