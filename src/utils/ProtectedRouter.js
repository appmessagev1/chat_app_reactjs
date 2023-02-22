import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { setUser } from "redux/slices/authSlice";
import userApi from "api/userApi";
import { getTokenFromLocalStorage, getUserFromLocalStorage } from "utils/auth";

const ProtectedRouter = ({ socket }) => {
  const dispatch = useDispatch()
  const token = getTokenFromLocalStorage();
  const user = getUserFromLocalStorage();

  const getUser = async (id) => {
    const response = await userApi.getUserById(id)
    if (response.error_code === 0) {
      const _user = response.data[0]
      const action = setUser(_user)
      dispatch(action)
      socket.emit("sign_in", _user);
    }
  }

  useEffect(() => {
    if (token) {
      getUser({id: user._id })
    }
  }, [token])
  return token ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRouter;
