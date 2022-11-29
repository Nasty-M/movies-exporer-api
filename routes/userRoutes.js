const userRouter = require('express').Router();

const { getUser, updateUser } = require('../controllers/users');
const { updateUserInfoValidator } = require('../middlewares/validation');

userRouter.get('/users/me', getUser);

userRouter.patch('/users/me', updateUserInfoValidator, updateUser);

module.exports = userRouter;
