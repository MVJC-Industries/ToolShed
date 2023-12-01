const errorHandler = (errInfo) => {
  const { controller, method, type, err } = errInfo;
  return {
    log: `${controller}.${method} ${type}: ERROR: ${
      typeof err === "object" ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in ${controller}.${method}. Check server logs for more details.`,
    },
  };
};

module.exports = errorHandler;
