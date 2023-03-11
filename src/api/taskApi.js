import axiosClient from "api/axiosClient";
import moment from "moment";

const userApi = {
  postTask(payload) {
    const url = "/tasks";
    return axiosClient.post(url, payload);
  },

  getTasks(payload) {
    const { id, startTime, endTime } = payload;
    const body = {
      startTime: startTime || moment().subtract(1, "weeks").startOf("week").format(),
      endTime: endTime || moment().endOf("week").format(),
    };
    const url = `/tasks/${id || ""}`;
    return axiosClient.post(url, body);
  },

  updateStatus(payload) {
    const { id, status } = payload;
    const url = `/tasks/${id || ""}`;
    return axiosClient.put(url, { status });
  },

  updateTask(payload) {
    const { id, task } = payload;
    const url = `/tasks/${id || ""}/update`;
    return axiosClient.put(url, { task });
  },
};

export default userApi;
