const User = require('../models/user');

module.exports.findUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не нйден' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((oldData) => res.send(oldData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не нйден' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((oldData) => res.send(oldData))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: 'Пользователь не нйден' });
      }

      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
