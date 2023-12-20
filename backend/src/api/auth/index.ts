import { log } from "console";

export default (app) => {
  app.post("/auth/signup", require("./authSignUp").default);
  app.post("/auth/signin", require("./authSignIn").default);
};
