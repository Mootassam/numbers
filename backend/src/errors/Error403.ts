export default class Error403 extends Error {
    code: Number;
  
    constructor(messageCode?, ...args) {
      let message;
  
      if (messageCode) {
        message = messageCode;
      }
  
      message = message || "errors.forbidden.message";
  
      super(message);
      this.code = 403;
    }
  }
  