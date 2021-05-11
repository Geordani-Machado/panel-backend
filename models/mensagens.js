
const mongoose = require('mongoose');

const MensagemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  novaMensagem:{
     type: String,
     required: false,
  },
  compraSucesso:{
    type: String,
    required: false,
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

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

module.exports = Mensagem;
