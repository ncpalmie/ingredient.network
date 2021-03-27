const mongoose = require('mongoose');

const { Schema } = mongoose;
const ingredient = new Schema({
  _id: {
    type: Schema.Types.ObjectID,
  },
  name: {
    type: String,
  },
  strongConnections: {
    type: Array,
  },
  weakConnections: {
    type: Array,
  },
  imgUrl: {
    type: String,
  },
  imgHeightOffset: {
    type: Number,
  },
  imgWidthOffset: {
    type: Number,
  },
  imgTopOffset: {
    type: Number,
  },
  imgLeftOffset: {
    type: Number,
  },
});

module.exports = mongoose.model('ingredient', ingredient);
