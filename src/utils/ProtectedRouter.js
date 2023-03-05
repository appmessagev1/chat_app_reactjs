import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { setUser } from "redux/slices/authSlice";
import userApi from "api/userApi";
import { getTokenFromLocalStorage, getUserIdFromLocalStorage } from "utils/auth";

const ProtectedRouter = ({ socket }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = getTokenFromLocalStorage();
  const userId = getUserIdFromLocalStorage();

  const getUser = async (id) => {
    try {
      const response = await userApi.getUserById({ id })
      if (response.error_code === 0) {
        const _user = response.data[0]
        const action = setUser(_user)
        dispatch(action)
        socket.emit("sign_in", _user);
      }
    } catch (error) {
      navigate("/sign_in")
    }
  }

  useEffect(() => {
    if (token && userId) {
      getUser(userId);
    }
  }, [token])

  return (token && userId) ? <Outlet /> : <Navigate to="/sign_in" />;
};

export default ProtectedRouter;
