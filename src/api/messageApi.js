import axiosClient from "api/axiosClient";

const messageApi = {
  getMessageInConversation(payload) {
    // payload = {
    //    conversationId,
    //    limit
    // }

    const {conversationId, limit} = payload;
    const url = `/messages/${conversationId || ''}/get_message_in_conversation?limit=${limit || ''}`;
    return axiosClient.get(url, { ...payload  });
  },
  postMessage(payload) { 
    // payload = {
    //    content
    //    conversationId
    //    senderId
    // }

    const url = "/messages"
    return axiosClient.post(url, { ...payload });
  }
};

export default messageApi;
