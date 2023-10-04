import axios from './axios'

export const loginRequest = user => axios.post('/login', user)
export const registerRequest = user => axios.post('/register', user)
export const logoutRequest = () => axios.post('/logout')
export const verifyTokenRequest = () => axios.post('/verify')

//de momento por aqui para probar
export const uploadRequest = values => axios.post('/upload', values)