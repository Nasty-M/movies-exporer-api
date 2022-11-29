const STATUS_CODE = require('../utils/errorCode');

class NotAuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.noAuth;
    this.name = this.constructor.name;
  }
}

module.exports = NotAuthError;
