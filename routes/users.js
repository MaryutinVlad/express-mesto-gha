const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findUsers,
  findUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', findUsers);

userRouter.get('/me', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  })
}), getCurrentUser);

userRouter.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  })
}), findUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
}), updateUser);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helper) => {
      if (value !== value.match(/(http|https):\/\/(www\.|)\S+/g).join('')) {
        return helper.message('Avatar validation failed');
      } else {
        return value;
      }
    }),
  })
}), updateAvatar);

module.exports = userRouter;
