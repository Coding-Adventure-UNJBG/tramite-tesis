import axios from './axios'

export const getTramitesRequest = () => axios.get('/tramite')
export const getTramiteRequest = id => axios.get(`/tramite/${id}`)

export const saveSolicitudRequest = values => axios.post('/tramite', values)

export const getProfesoresRequest = () => axios.get('/tramite/profesores')
export const getComitesRequest = () => axios.get('/tramite/comite')
export const saveComitesRequest = values => axios.post('/tramite/comite', values)