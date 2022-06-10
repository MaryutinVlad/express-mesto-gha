const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'поле name должно быть заполнено'],
    minlength: [2, 'в поле name должно быть не менее 2 символов'],
    maxlength: 30,
  },
  about: {
    type: String,
    required: [true, 'поле about должно быть заполнено'],
    minlength: [2, 'в поле about должно быть не менее 2 символов'],
    maxlength: [30, 'в поле about должно быть не более 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'поле avatar должно быть заполнено'],
  },
});

module.exports = mongoose.model('user', userSchema);
