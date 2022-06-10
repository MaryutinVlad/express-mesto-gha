const userRouter = require('express').Router();

const {
  findUsers,
  findUser,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', findUsers);

userRouter.get('/:id', findUser);

userRouter.post('/', createUser);

userRouter.patch('/me', updateUser);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
