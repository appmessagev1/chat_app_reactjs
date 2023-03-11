import axiosClient from "api/axiosClient";

const groupApi = {
  getGroups(payload) {
    // payload = {
    //   id
    // }

    const { id } = payload;
    const url = `/group/${id}`;
    return axiosClient.get(url);
  },

  getGroupById(payload) {
    const { id } = payload;
    const url = `/group/getById/${id}`;
    return axiosClient.get(url);
  },

  postGroup(payload) {
    // payload = {
    //   senderId,
    //   ownerId,
    //   lastMessage,
    //   name
    // }
    const url = "/group";
    return axiosClient.post(url, { ...payload });
  },

  addUserToGroup(payload) {
    const url = "/group/addUser";
    return axiosClient.post(url, { ...payload });
  },

  getUsersInGroup(payload) {
    const { id } = payload;
    const url = `/group/${id}/users`
    return axiosClient.get(url)
  },

  removeUserInGroup(payload) {
    const { id } = payload;
    const url = `/group/${id}`;
    return axiosClient.delete(url)
  }
};

export default groupApi;
