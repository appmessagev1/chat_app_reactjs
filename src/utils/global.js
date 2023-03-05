import moment from "moment";

const formatDate = 'DD/MM/YYYY'
const formatOnlyTime = 'hh:mm'

const mapStatusToId = status => {
  let _status;
  switch (status) {
    case "toDo":
      _status = 0;
      break;
    case "inProcess":
      _status = 1;
      break;
    case "inReview":
      _status = 2;
      break;
    case "done":
      _status = 3;
      break;

    default:
      _status = 0;
      break;
  }
  return _status;
};

const mapIdToColor = (status) => {
  let _color;
  switch (status) {
    case "toDo":
      _color = "#F35B50";
      break;
    case "inProcess":
      _color = "#F99E1D";
      break;
    case "inReview":
      _color = "#FFDE31";
      break;
    case "done":
      _color = "#A7E040";
      break;

    default:
      _color = "#F35B50";
      break;
  }
  return _color;
}

const formatTaskTime = (time) => {
  const today = moment().format(formatDate)
  const formattedTime = moment(time).format(formatDate)
  if (formattedTime === today) {
    return moment(time).format(formatOnlyTime);
  }
  return formattedTime
}

export { formatDate, formatOnlyTime, mapStatusToId, mapIdToColor, formatTaskTime };