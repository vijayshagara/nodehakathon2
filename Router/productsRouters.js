const express = require("express");
const productModules = require("../Modules/productsModules");
const router = express.Router();
const AuthoriseMiddleWar = require("../Modules/authModules");

//URL/products/get/getProducts
router.get("/get", productModules.getProducts);

//URL/products/create/createProducts
router.post(
  "/create",
  AuthoriseMiddleWar.authorisedUser,
  productModules.createProducts
);

//URL/products/update/updateProducts
router.put(
  "/update/:id",
  AuthoriseMiddleWar.authorisedUser,
  productModules.updateProducts
);

//URL/products/delete/deleteProducts
router.delete(
  "/delete/:id",
  AuthoriseMiddleWar.authorisedUser,
  productModules.deleteProducts
);

module.exports = router;
