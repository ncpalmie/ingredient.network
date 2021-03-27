const express = require('express');

const router = new express.Router();

// Related mongoose models
const ingredientsModel = require('../models/ingredient');

// Route for getting ingredient data
router.get('/ingredients/:name', (req, res) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  ingredientsModel.findOne({ name: req.params.name.toLowerCase().replace(regex, '') }, (err, ingredient) => {
    if (err) {
      res.send(err);
    } else {
      res.send(ingredient);
    }
  });
});

// Route for updating image height offset
router.patch('/ingredients/:name', (req, res) => {
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
  ingredientsModel.findOne({ name: req.params.name.toLowerCase().replace(regex, '') },
    { $push: { imgHeightOffset: req.body.imgHeightOffset } },
    (err, ingredient) => {
      if (err) {
        res.send(err);
      } else {
        res.send(ingredient);
      }
    });
});

module.exports = router;
