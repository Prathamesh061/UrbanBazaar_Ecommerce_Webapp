const orderController = require("../controllers/order.controller");
const { auth } = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/eshop/api/v1/order/new",
    [auth.authJWT, auth.authorizeRoles("admin")],
    orderController.createOrder
  );
};
