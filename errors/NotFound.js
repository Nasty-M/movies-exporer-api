const STATUS_CODE = require('../utils/errorCode');

class NotFound extends Error {
  constructor(message = 'Объект не найден') {
    super(message);
    this.statusCode = STATUS_CODE.notFound;
    this.name = this.constructor.name;
  }
}

module.exports = NotFound;
