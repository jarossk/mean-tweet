var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  username: String, 
  password: String, // hash created from password
  created_at: { type: Date, default: Date.now }
});


var postSchema = new mongoose.Schema({
  created_by: { type: Schema.ObjectId, ref: 'User'},
  cerated_at: { type: Date, default: Date.now },
  text: String
});

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);