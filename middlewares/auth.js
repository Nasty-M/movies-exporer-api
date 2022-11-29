require('dotenv').config();
const jwt = require('jsonwebtoken');
const NotAuthError = require('../errors/NotAuthError');
const { JWT_SECRET_DEV } = require('../utils/devConstants');

const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(new NotAuthError('Проблемы с токеном'));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    next(new NotAuthError('Авторизация не пройдена'));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

module.exports = { auth };
