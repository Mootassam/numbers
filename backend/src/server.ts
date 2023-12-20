import api from "./api";
require("dotenv").config();
const PORT = process.env.PORT || 8080;
api.listen(PORT, () => {
  console.log("the application Running on this ", PORT);
});
