import axiosClient from "api/axiosClient";

const messageApi = {
  getMessageInConversation(payload) {
    // payload = {
    //    conversationId,
    //    limit
    // }

    const { conversationId, limit, offset } = payload;
    const url = `/messages/${conversationId || ""}/get_message_in_conversation?limit=${limit || ""}&offset=${offset || ""}`;
    return axiosClient.get(url);
  },
  postMessageInConversation(payload) {
    // payload = {
    //    content
    //    conversationId
    //    senderId
    // }

    const url = "/messages";
    return axiosClient.post(url, { ...payload });
  },
  getMessageInGroup(payload) {
    // payload = {
    //    conversationId,
    //    limit
    // }
  
    const { groupId, limit, offset } = payload;
    const url = `/messages/${groupId || ""}/get_message_in_group?limit=${limit || ""}&offset=${offset || ""}`;
    return axiosClient.get(url);
  },
  postMessageInGroup(payload) {
    // payload = {
    //    content
    //    conversationId
    //    senderId
    // }

    const url = "/messages/group";
    return axiosClient.post(url, { ...payload });
  },
};

export default messageApi;
