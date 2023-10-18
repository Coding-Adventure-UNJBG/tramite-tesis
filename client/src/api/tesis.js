import axios from './axios'

export const getTesisRequest = () => axios.get('/tesis')
export const saveTesisRequest = values => axios.post('/tesis', values)