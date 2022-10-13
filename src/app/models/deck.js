const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const deck = new Schema({
    _id: {type: Schema.Types.ObjectId},
    cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
  });

module.exports = mongoose.model('deck', deck);