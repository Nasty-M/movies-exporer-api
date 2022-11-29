const STATUS_CODE = require('../utils/errorCode');

class CastomizeError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.dataError;
    this.name = this.constructor.name;
  }
}

module.exports = CastomizeError;
