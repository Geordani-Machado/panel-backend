
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
  braipCBSB: {
    type: String,
    default: 'Olá [ClientNome] sua compra no Boleto foi realizada com sucesso.',
  },
  braipCBSP: {
    type: String,
    default: 'Olá [ClientNome] sua compra no PIX foi realizada com sucesso.',
  },
  braipBG01: {
    type: String,
    default: 'Olá [ClientNome] O boleto [Boleto] foi gerado em nossa loja.',
  },
  braipBG02: {
    type: String,
    default: 'Olá [ClientNome] O boleto [Boleto] foi gerado em nossa loja.',
  },
  braipBG03: {
    type: String,
    default: 'Olá [ClientNome] se você aind atem interesse em nosso produto, não se esqueca de pagar o boleto. [Boleto]',
  },
  braipBG04: {
    type: String,
    default: 'Olá [ClientNome] O boleto [Boleto] foi gerado em nossa loja.',
  },
  braipBG05: {
    type: String,
    default: 'Olá [ClientNome] O boleto [Boleto] foi gerado em nossa loja.',
  },
  braipBG06: {
    type: String,
    default: 'Olá [ClientNome], Hoje é o ultimo dia para pagar o boleto [boleto], e aproveitar essa super oportunidade de 10% somente para o dia de hoje!',
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
