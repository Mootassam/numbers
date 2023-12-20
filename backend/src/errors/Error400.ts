export default class Error400 extends Error {
  code: Number;

  constructor(language?, messageCode?, ...args) {
    let message;

    if (messageCode) {
      message = messageCode;
    }

    message = message || "errors.validation.message";

    super(message);
    this.code = 400;
  }
}
