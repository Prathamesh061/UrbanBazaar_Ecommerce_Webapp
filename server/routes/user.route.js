const userController = require("../controllers/user.controller");

module.exports = (app) => {
  app.post("/eshop/api/v1/register", userController.registerUser);
  app.post("/eshop/api/v1/login", userController.loginUser);
};
