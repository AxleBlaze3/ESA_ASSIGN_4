const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema({
  from: {type: Number, required: true},
  text:{ type: String, required: true},
  to:{ type: Number, required: true}
  
 
});

mongoose.model('smsS', smsSchema);