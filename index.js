const GuacamoleLite = require("guacamole-lite");
const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const path = require("path");
const { encrypt } = require("./generateToken");

app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", express.static("assets"));

const server = http.createServer(app);
const PORT = 8080
const HOST = 'localhost';

server.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

const guacdOptions = {
  host: "172.19.0.1", // ip
  port: 4822, // port of guacd
};

const clientOptions = {
  crypt: {
    cypher: "AES-256-CBC",
    key: "MySuperSecretKeyForParamsToken12",
  },
  log: {
    verbose: true,
    
  },
  connectionDefaultSettings: {
    rdp: {
      "create-drive-path": false,
      "ignore-cert": true,
      "enable-wallpaper": false,
      "create-recording-path": false,
      'security': 'any',
    },
  },
};

app.get("/connect", (req, res) => {
  var encryptedData = encrypt({
    "connection": {
      "type": "rdp",
      "settings": {
        "hostname": "172.19.0.1",
        "port": "3389",
        "username": "ubuntu",
        "password": "ubuntu",
      }
    }
  })
  res.render("index",{token: encryptedData});
});

const guacServer = new GuacamoleLite({ server }, guacdOptions, clientOptions);
guacServer.on("error", (clientConnection, error) => {
  console.error(clientConnection, error);
});
guacServer.on("open", (clientConnection) => {
  console.log(clientConnection.connectionSettings);
});

guacServer.on("close", (clientConnection) => {
  console.log(clientConnection.connectionSettings);
});

server.listen(PORT);
console.log(`Running on http://${HOST}:${PORT}`);