import axios from './axios'

export const getTesisRequest = () => axios.get('/tesis')
export const saveTesisRequest = values => axios.post('/tesis', values)
export const getMyTesisRequest = id => axios.get(`/tesis/${id}`)

export const updateEstadoRequest = values => axios.post('/tesis/estado', values)

export const saveObservacionAsesorRequest = values => axios.post('/tesis/asesor/obs', values)
export const subsanarObservacionAsesorRequest = values => axios.post('/tesis/asesor/subsanar', values)

export const saveObservacionJuradoRequest = values => axios.post('/tesis/jurado/obs', values)
export const subsanarObservacionJuradoRequest = values => axios.post('/tesis/jurado/subsanar', values)

export const getObservacionAsesorRequest = id => axios.get(`/tesis/${id}/asesor`)
export const getObservacionJuradoRequest = id => axios.get(`/tesis/${id}/jurado`)