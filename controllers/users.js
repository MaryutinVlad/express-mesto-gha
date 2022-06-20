const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const AuthError = require('../errors/auth-error');

module.exports.findUsers = (_req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!password) {
    throw new BadRequestError('Password is missing');
  }

  if (!validator.isEmail(email)) {
    throw new AuthError('Email is incorrect or missing');
  }

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((newUser) => User.findById(newUser._id))
        .then((newUser) => res.send(newUser))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError({ message: err.message }));
          }
          if (err.code === 11000) {
            return res.status(409).send({ message: err.message });
          }

          return next(err);
        });
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((currentUser) => {
      if (!currentUser) {
        throw new NotFoundError('User not found');
      }
      return res.send(currentUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError({ message: err.message }));
      }

      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, context: 'query' })
    .then(() => User.findById(req.user._id)
      .then((user) => res.send(user)))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError({ message: err.message }));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError({ message: err.message }));
      }

      return next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar.replace(/[https://|http://]/g, '')) {
    throw new BadRequestError('Avatar link validation failed');
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, context: 'query' })
    .then(() => User.findById(req.user._id)
      .then((user) => res.send(user)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError({ message: err.message }));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError({ message: err.message }));
      }

      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Password or email is incorrect');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError('Password or email is incorrect');
          }

          const token = jwt.sign(
            { _id: user._id },
            'some-secret-key',
            { expiresIn: '7d' },
          );

          return res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .send({ token });
        });
    })
    .catch(next);
};
