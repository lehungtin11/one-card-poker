const mongoose = require('mongoose');
var mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const card = new Schema({
    code: {type: String},
    type: {type: String},
    value: {type: String},
    img: {type: String,},
    decks: { type: Schema.Types.ObjectId, ref: 'deck' }
  });

  card.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
  })  
module.exports = mongoose.model('Card', card);