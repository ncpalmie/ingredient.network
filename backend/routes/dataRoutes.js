const express = require('express');

const router = new express.Router();
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

// Related mongoose models
const ingredientsModel = require('../models/ingredient');

// Route for getting ingredient data
router.get('/ingredients/:name', (req, res) => {
  ingredientsModel.findOne({ name: req.params.name.toLowerCase().replace(regex, '') }, (err, ingredient) => {
    if (err) {
      res.send(err);
    } else {
      res.send(ingredient);
    }
  });
});

// Route for updating ingredient image information
router.patch('/ingredients/:name/image', (req, res) => {
  ingredientsModel.findOneAndUpdate({ name: req.params.name.toLowerCase().replace(regex, '') },
    {
      $set: {
        imgUrl: req.body.imageData.imgUrl,
        imgHeightOffset: req.body.imageData.imgHeightOffset,
        imgWidthOffset: req.body.imageData.imgWidthOffset,
        imgTopOffset: req.body.imageData.imgTopOffset,
        imgLeftOffset: req.body.imageData.imgLeftOffset,
      },
    }, { upsert: true },
    (err, ingredient) => {
      if (err) {
        res.send(err);
      } else {
        res.send(ingredient);
      }
    });
});

module.exports = router;
