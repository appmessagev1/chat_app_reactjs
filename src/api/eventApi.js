import axiosClient from "./axiosClient";

// eventRoute.get("/", jwtService.verifyAccessToken, eventController.getEvents);
// eventRoute.post("/", jwtService.verifyAccessToken, eventController.postEvent);
// eventRoute.put("/:id", jwtService.verifyAccessToken, eventController.updateEvent);
// eventRoute.delete("/:id", jwtService.verifyAccessToken, eventController.deleteEvent);
// eventRoute.get("/user/:id", jwtService.verifyAccessToken, eventController.getEventByUserId);
// eventRoute.get("/:id/users", jwtService.verifyAccessToken, eventController.getUsersInEvent);
// eventRoute.post("/addUsers", jwtService.verifyAccessToken, eventController.addUserToEvent);
// eventRoute.post("/removeUsers/:id", jwtService.verifyAccessToken, eventController.removeUserFromEvent);
const eventApi = {
  postEvent(payload) {
    const url = "/events"
    return axiosClient.post(url, payload)
  },

  getEventByUserId(payload) {
    const { id } = payload;
    const url = `events/user/${id}`;
    return axiosClient.get(url)
  }
}

export default eventApi;