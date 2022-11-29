const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const CastomizeError = require('../errors/CastomizeError');
const ConflictError = require('../errors/ConflictError');
const { JWT_SECRET_DEV } = require('../utils/devConstants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => {
        const userData = {
          name: user.name,
          email: user.email,
          _id: user._id,
        };
        res.send(userData);
      })
      .catch((error) => {
        if (error.name === 'ValidationError') {
          next(new CastomizeError('Данные некорректны'));
        } else if (error.code === 11000) {
          next(new ConflictError(`Пользователь с email ${email} уже существует!`));
        } else {
          next(error);
        }
      }));
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      res
        .cookie('access_token', token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: false,
        })
        .send({ message: 'Аутентификация прошла успешно' });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound());
      }
      return res.send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, email, _id = req.user._id } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => {
      throw new NotFound('Пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        next(new CastomizeError('Данные некорректны'));
      } else if (error.code === 11000) {
        next(new ConflictError(`Пользователь с email ${email} уже существует!`));
      } else {
        next(error);
      }
    });
};

module.exports = {
  createUser, loginUser, getUser, updateUser,
};
