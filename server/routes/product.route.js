const productController = require("../controllers/product.controller");

// route to save a new product to the database
module.exports = (app) => {
  app.post("/eshop/api/v1/products", productController.createProduct);

  app.get("/eshop/api/v1/products", productController.getAllProducts);

  app.get("/eshop/api/v1/product/:id", productController.getDetails);

  app.put("/eshop/api/v1/product/:id", productController.updateProduct);

  app.delete("/eshop/api/v1/product/:id", productController.deleteProduct);
};
