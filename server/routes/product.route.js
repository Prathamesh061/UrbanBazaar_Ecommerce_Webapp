const productController = require("../controllers/product.controller");
const { auth } = require("../middlewares");
// route to save a new product to the database
module.exports = (app) => {
  app.post(
    "/eshop/api/v1/admin/products",
    [auth.authJWT, auth.authorizeRoles("admin")],
    productController.createProduct
  );

  app.get("/eshop/api/v1/products", productController.getAllProducts);

  app.get("/eshop/api/v1/product/:id", productController.getDetails);

  app.put(
    "/eshop/api/v1/admin/product/:id",
    [auth.authJWT, auth.authorizeRoles("admin")],
    productController.updateProduct
  );

  app.delete(
    "/eshop/api/v1/admin/product/:id",
    [auth.authJWT, auth.authorizeRoles("admin")],
    productController.deleteProduct
  );
};
