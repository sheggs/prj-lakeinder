// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const http = require('http').Server(app);
const PORT = 6584;
const authware = require('./middleware/authware')
const cors = require('cors');
const jwt = require("jsonwebtoken")
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
// Pre checks

const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
client.connect()
const KEY = "$2lC7Mn`46+giA:BW[KYr<XQ]}KeuC"

const sendMessage = ((id, message, chat_room_id) => {
  return new Promise((resolve, reject) => {
    console.log(chat_room_id, id, message)
    client.query("INSERT INTO chat_table  (chat_room_id, sender, message) VALUES ("
      + chat_room_id + ", "
      + id + ", "
      + "\'" + message + "\'"
      + ")")
      .then((r) => {
        // Now notify both people in the chat room
        console.log("WORKS")
        console.log(r)
        resolve()
      }).catch((e) => {
        console.log(e)
        console.log("BROK")
        reject(e)
      })
  })

})



// Attaching middlewares the ExpressJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/message', authware, (req, res) => {
  console.log(req.user.id)
  console.log(req.body)
  let id = req.user.id
  let message = req.body.message
  let chat_room_id = req.body.chat_room_id
  /// INSERT into chat_table  (chat_room_id, sender, message) VALUES (1, 1, "Hey bae")
  client.query("INSERT INTO chat_table  (chat_room_id, sender, message) VALUES ("
    + chat_room_id + ", "
    + id + ", "
    + "\'" + message + "\'"
    + ")").then((r) => {
      // Now notify both people in the chat room
      res.send()
    }).catch((e) => {
      console.log(e)
      console.log("Error creating message... user id:" + id + ", chat_room_id: " + chat_room_id + " message: " + message)
    })

  console.log("hey")
})

app.post('/sendNotification', (req, res) => {
  console.log(req)
  socketIO.sockets.emit("global_match_update", {"ids" :req.body.ids})
  res.send()
})

// Starting the Server
http.listen(PORT, () => {
  console.log(`Lakeinder Notify Server. v1.0.1 [DEVELOPMENT] \n Listening on port ${PORT}`);
})


const globalMessageListener = (e) => {
  return new Promise((resolve, reject) => {
    try {
      let data = jwt.decode(e.token, KEY)
      let message = e.message
      let id = data.id
      let chat_room_id = e.chat_room_id
      sendMessage(id, message, chat_room_id).then((r) => {
        resolve()
        // Send success
      }).catch((e) => {
        reject("Unknown error")
      })
    } catch (e) {
      reject("auth_message_failed")
    }
  })


}
// Starting the Server
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
})
socketIO.use(function (socket, next) {
  // add jwt ath here?
  next()
  // next()
})
  .on('connection', function (socket) {
    // Connection now authenticated to receive further events
    socket.on("sendMessage", (e) => {
      globalMessageListener(e).then((r) => {
        console.log("sent message")
        socketIO.sockets.emit("global_message_update")

      }).catch((e) => {
        socket.emit(e)
      })

    })
  });

app.use(express.static('public'));
