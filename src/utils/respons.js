const responses = {
  success: (res, data) => {
    res.json({
      status: "Success",
      message: "Success",
      data: data,
    });
  },
  created: (res, data) => {
    res.status(201).json({
      status: "Success",
      message: "Success",
      data: data,
    });
  },
  badRequest: (res, message) => {
    res.status(400).json({
      status: "Bad Request",
      message: message,
    });
  },
  notFound: (res, message) => {
    res.status(404).json({
      status: "Not Found",
      message: message,
    });
  },
  forbidden: (res, message) => {
    res.status(403).json({
      status: "Forbidden",
      message: message,
    });
  },
};

export default responses;
