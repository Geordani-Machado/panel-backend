
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  whatsNumber: {
     type: String,
     required: false,
  },
  saldo: {
     type: String,
     required: false,
    default: '20,00',
  },
  password: {
    type: String,
    required: true,
  },
  accountConfirmation: {
    type: Boolean,
    default: false,
  },
  resetPass: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
