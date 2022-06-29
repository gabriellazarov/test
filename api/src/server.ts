import { PORT } from "./config";
const app = require("./app");

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}.`);
});
