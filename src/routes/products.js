const express = require("express");
const router = express.Router();
const Products = require("../models/ProductsModel");

router.get("/products", async (req, res) => {
  const  { category } = req.query
  try {
    const products = await Products.find(category ? {category} : {});
    console.log(products);
    res.send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/product/create", async (req, res) => {
  const { category, name, price, image } = req.body;

  try {
    const product = new Products({ category, name, price, image });
    await product.save();
    console.log(product);
  } catch (error) {
    console.error(error);
    // res.status(500).send(error);
  }
});

module.exports = router;
