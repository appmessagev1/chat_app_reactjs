const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token')
}

const getRefreshTokenFromLocalStorage = () => { 
  if (localStorage.getItem("refresh_token")) return localStorage.getItem("refresh_token");
}

const getUserIdFromLocalStorage = () => {
  if (localStorage.getItem("user_id")) return localStorage.getItem("user_id");
}

export { getTokenFromLocalStorage, getUserIdFromLocalStorage, getRefreshTokenFromLocalStorage };
