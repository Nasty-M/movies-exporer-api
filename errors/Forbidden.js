const STATUS_CODE = require('../utils/errorCode');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.forbiddenError;
    this.name = this.constructor.name;
  }
}

module.exports = Forbidden;
