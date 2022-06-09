const userRouter = require('express').Router();

const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/users', findUsers);

userRouter.get('/users/:id', findUser);

userRouter.post('/users', createUser);

userRouter.patch('/users/me', updateUser);

userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
