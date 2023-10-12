import axios from './axios'

export const getTramitesRequest = () => axios.get('/tramite')
export const saveSolicitudRequest = values => axios.post('/tramite', values)