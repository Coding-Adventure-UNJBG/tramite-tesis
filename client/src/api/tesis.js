import axios from './axios'

export const getTesisRequest = () => axios.get('/tesis')
export const saveTesisRequest = values => axios.post('/tesis', values)
export const getMyTesisRequest = id => axios.get(`/tesis/${id}`)

export const saveObservacionAsesorRequest = values => axios.post('/tesis/asesor/obs', values)
export const getObservacionAsesorRequest = id => axios.get(`/tesis/${id}/asesor`)