const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  openid: { type: String, unique: true },
  session_key: String,
  create_time: { type: Date, default: Date.now },
  last_visit_time: { type: Date, default: Date.now },
  info: {
    nickName: String,
    gender: Number,
    city: String,
    province: String,
    language: String,
    avatarUrl: String
  }
});


const User = mongoose.model('user', schema);

module.exports = User;
