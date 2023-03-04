import axiosClient from "api/axiosClient";

const userApi = {
  postTask(payload) {
    const url = '/tasks'
    return axiosClient.post(url, payload);
  },

  getTasks(payload) {
    const { id } = payload
    const url = `/tasks/${id || ''}`
    return axiosClient.get(url)
  },

  updateStatus(payload) {
    const { id, status } = payload
    const url = `/tasks/${id || ''}`
    return axiosClient.put(url, { status })
  },

  updateTask(payload) {
    const { id, task } = payload
    const url = `/tasks/${id || ''}/update`
    return axiosClient.put(url, { task })
  }
};

export default userApi;
