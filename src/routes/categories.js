const express = require("express");
const router = express.Router();
const Categories = require("../models/CategoriesModel");

router.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.find({});
    console.log(categories);
    res.send(categories)
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
