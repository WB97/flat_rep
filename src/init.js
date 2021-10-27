import "regenerator-runtime";
import "dotenv/config.js";
import "./database/db.js";
import "./models/Music.js";
import "./models/User.js";
import app from "./server.js";

const PORT = 8080;

const handleListening = () =>
  console.log(`Server listenting on port http://localhost:${PORT}`);

app.listen(8080, handleListening);
