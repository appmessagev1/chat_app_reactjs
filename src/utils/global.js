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

export { mapStatusToId }