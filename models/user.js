const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'в поле name должно быть не менее 2 символов'],
    maxlength: [30, 'в поле name должно быть не более 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'в поле about должно быть не менее 2 символов'],
    maxlength: [30, 'в поле about должно быть не более 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return link === link.match(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g).join('');
      },
      message: 'Link validation failed',
    },
  },
  email: {
    type: String,
    required: [true, 'поле email должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'поле password должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
