export default class Error401 extends Error {
    code: Number;
  
    constructor(messageCode?, ...args) {
      let message;
  
      if (messageCode) {
        message = messageCode;
      }
  
      message = message || "errors.validation.message";
  
      super(message);
      this.code = 401;
    }
  }
  