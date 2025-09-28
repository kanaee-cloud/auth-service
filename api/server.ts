import app from "../src/app";
import config from "../src/config/config";
const port = config.port;

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});