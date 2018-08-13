const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const schema = new Schema({
  openid: { type: String, unique: true },
  session_key: String,
  create_time: { type: Date, default: Date.now },
  last_visit_time: { type: Date, default: Date.now },
  user_info: {
    nickName: String,
    gender: Number,
    city: String,
    province: String,
    language: String,
    avatarUrl: String
  }
});


const Session = mongoose.model('session', schema);

module.exports = Session;
