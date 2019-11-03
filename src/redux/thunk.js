import axios from 'axios';

import { setAuth, logOutAuth, keepSession, getUsers, createUsers, getProducts } from './action.js'




// Auth thunks
const attemptLogin = (user) => {
  return async (dispatch) => {
    const auth = (await axios.post('/api/login', { email: user.email, password: user.password })).data
    dispatch(setAuth(auth))
    //history.push('/')
  }
}

const attemptLogout = () => {
return async (dispatch) => {
    await axios.delete('/api/logout')
    dispatch(logOutAuth())
  }
}

const attemptSession = () => {
  return async (dispatch) => {
    const auth = (await axios.get('/api/session')).data
    dispatch(keepSession(auth))
  }
}

//User thunks
const getUsersThunk = ()=>{
  return async (dispatch)=>{
    const response = (await axios.get('/api/users')).data;
    dispatch(getUsers(response))
  }
}
const createUserThunk = (user) => {
  return async (dispatch)=> {
    const response = (await axios.post('/api/users', user)).data;
    dispatch(createUsers(response));
  }
}

//Product thunks
const getProductsThunk = ()=>{
  return async (dispatch)=>{
    const response = (await axios.get('/api/products')).data;
    dispatch(getProducts(response));
  }
}

export {getProductsThunk, getUsersThunk, createUserThunk, attemptLogin, attemptSession, attemptLogout}