class CustomError {
  constructor(status, details) {
    this.status = status.code;
    this.message = status.tag;
    this.details = details;
  }
}

module.exports = CustomError;