const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const card = new Schema({
    name: {type: String},
    value: {type: String},
    img: {type: String,},
  });

module.exports = mongoose.model('Card', card);