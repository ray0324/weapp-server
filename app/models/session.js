const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schema = new Schema({
  open_id: String,
  uuid: String,
  skey: String,
  create_time: Date,
  last_visit_time: Date,
  session_key: String,
  user_info: String
});


const Session = mongoose.model('session', schema);

module.exports = Session;
