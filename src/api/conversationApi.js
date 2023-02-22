import axiosClient from "api/axiosClient";

const conversationApi = {
  getConversations(payload) {
    // payload = {
    //   id
    // }

    const { id } = payload;
    const url = `/conversations/${id}`;
    return axiosClient.get(url);
  },

  postConversation(payload) {
    // payload = {
    //   senderId,
    //   userId,
    //   lastMessage
    // }
    const url = '/conversations'
    return axiosClient.post(url, {...payload })
  }
};

export default conversationApi;
