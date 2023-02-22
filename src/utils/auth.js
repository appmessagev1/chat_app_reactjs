const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}

const getRefreshTokenFromLocalStorage = () => { 
  return localStorage.getItem('refresh_token')
}

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export { getTokenFromLocalStorage, getUserFromLocalStorage, getRefreshTokenFromLocalStorage };
