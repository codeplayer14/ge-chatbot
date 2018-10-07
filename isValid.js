module.exports = userRequest => {
  return (
    userRequest.hasOwnProperty("name") &&
    userRequest.hasOwnProperty("address") &&
    userRequest.hasOwnProperty("email") &&
    userRequest.hasOwnProperty("contact") &&
    userRequest.hasOwnProperty("issue") &&
    userRequest.hasOwnProperty("pin") &&
    userRequest.hasOwnProperty("appliance")
  );
};
