const User = require('../models/user');

module.exports.findUsers = (_req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({ message: err.message });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((newUser) => res.send({ data: newUser }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, context: 'query' })
    .then(() => User.findById(req.user._id)
      .then((user) => res.send(user)))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send({ message: err.message });
      }
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({ message: err.message });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then(() => User.findById(req.user._id)
      .then((user) => res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: err.message });
    });
};
