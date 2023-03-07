import axiosClient from "api/axiosClient";

const userApi = {
  getUserByIds(payload) {
    const url = "/users/getByIds";
    return axiosClient.post(url, { ...payload });
  },
  getUserById(payload) {
    const { id } = payload;
    const url = `/users/${id || ''}`;
    return axiosClient.get(url)
  },
  updateProfile(payload) {
    const { id, ...form } = payload;
    const url = `/users/${id || ''}`;
    return axiosClient.put(url, { ...form })
  },
  getUsersByNameOrEmail(payload) {
    const { searchInput } = payload;
    const url = `/users?search=${searchInput || ''}`;
    return axiosClient.get(url)
  }
};

export default userApi;
