export default class Error404 extends Error {
  code: Number;

  constructor(messageCode?, ...args) {
    let message;

    if (messageCode) {
      message = messageCode;
    }

    message = message || "errors.notFound.message";

    super(message);
    this.code = 404;
  }
}
