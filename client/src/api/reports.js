import axios from './axios'

export const getUsuarioRequest = () => axios.get('/reporte/user')
export const getBachilleresRequest = () => axios.get('/reporte/bachilleres')
export const getComitesRequest = () => axios.get('/reporte/comites')