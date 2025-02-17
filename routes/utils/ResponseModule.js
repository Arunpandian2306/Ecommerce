const sendSuccess = (res, result) => {
  const response = {
    status: "SUCCESS",
    result,
  };
  res.status(200).json(response);
};

const sendError = (res, message, error, code) => {
  const response = {
    status: "FAILURE",
    message,
    error,
    code,
  };
  res.status(422).json(response);
};

module.exports = {
  sendSuccess,
  sendError,
};
