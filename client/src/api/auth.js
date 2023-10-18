import axios from './axios'

export const loginRequest = user => axios.post('/login', user)
export const logoutRequest = () => axios.post('/logout')
export const verifyTokenRequest = () => axios.post('/verify')

export const registerRequest = user => axios.post('/usuario', user)
export const getUsersRequest = () => axios.get('/usuario')
export const getUserRequest = id => axios.get(`/usuario/${id}`)
export const updateUserRequest = (id, user) => axios.put(`/usuario/${id}`, user)
export const deleteUserRequest = id => axios.delete(`/usuario/${id}`)
//de momento por aqui para probar
export const uploadRequest = values => axios.post('/upload', values)
export const saveDocumentRequest = values => axios.post('/portafolio', values)