import axios from "axios";
import axiosClient from "api/axiosClient";

const uploadApi = {
  uploadImgToCloudinary(payload) {
    const data = new FormData();
    data.append("file", payload)
    data.append("upload_preset", "chat_app");
    const url = "https://api.cloudinary.com/v1_1/dongsd1e2/image/upload";
    return new Promise( async (resolve, reject) => { 
      const response = await axios.post(url, data)
      if (response.status === 200) {
        resolve(response.data)
      } else {
        reject(response)
      }
    })
  },
  uploadImg(file) {
    const url = "/uploads/upload_img"
    return axiosClient.post(url, file)
  }
};

export default uploadApi;
