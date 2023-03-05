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
};

export default groupApi;
