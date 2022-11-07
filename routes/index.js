const authRouter = require('express').Router();

const { createUser, loginUser } = require('../controllers/users');
const { createUserValidator, loginUserValidator } = require('../middlewares/validation');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', loginUserValidator, loginUser);

module.exports = authRouter;
