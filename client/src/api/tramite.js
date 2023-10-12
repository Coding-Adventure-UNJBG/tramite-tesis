import axios from './axios'

export const saveSolicitudRequest = values => axios.post('/tramite', values)