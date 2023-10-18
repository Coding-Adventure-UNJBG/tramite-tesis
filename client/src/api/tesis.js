import axios from './axios'

export const getTesisRequest = () => axios.get('/tesis')
export const saveTesisRequest = values => axios.post('/tesis', values)
export const getMyTesisRequest = id => axios.get(`/tesis/${id}`)