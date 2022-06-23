const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'поле name должно быть заполнено'],
    minlength: [2, 'в поле name должно быть не менее 2 символов'],
    maxlength: [30, 'в поле name должно быть не более 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'поле link должно быть заполнено'],
    validate: {
      validator(link) {
        return link === link.match(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/g).join('');
      },
      message: 'Link validation failed',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    default: [],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
