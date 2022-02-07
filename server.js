const http = require("http");
const app = require('./app');
var cors = require('cors');
app.use(cors());
const server = http.createServer(app);
server.listen(8000,console.log("App is running"));