var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {type: String, required: true},
  maxDocumentId: {type: Number},
  maxMessageId: {type: Number},
  maxContactsId: {type: Number}
});

module.exports = mongoose.model('Sequence', schema);
