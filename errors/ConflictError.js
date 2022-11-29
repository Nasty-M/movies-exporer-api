const STATUS_CODE = require('../utils/errorCode');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODE.conflictError;
    this.name = this.constructor.name;
  }
}

module.exports = ConflictError;
