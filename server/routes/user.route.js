const userController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/eshop/api/v1/register", userController.registerUser);
  app.post("/eshop/api/v1/login", userController.loginUser);
  app.get("/eshop/api/v1/logout", userController.logoutUser);
  app.post("/eshop/api/v1/password/forgot", userController.forgotPassword);
};
