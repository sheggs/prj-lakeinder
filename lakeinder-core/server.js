// Getting all the middlewares and modules
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const http = require('http').Server(app);
const PORT = 6326;

const cors = require('cors');

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
// Pre checks

const { Pool, Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5433,
})
client.connect()

client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE  table_schema = 'public' AND    table_name   = 'users_user')").then((r) => {
  console.log("Pre check passed")
  if (r.rows.length == 0) {
    console.log("Run auth_service migrations first.  cd ../auth_service\npython manage.py makemigrations\n python manage.py migrate")
    process.exit(1)
  }
}).catch((e) => {
  console.log("Run auth_service migrations first.  cd ../auth_service\npython manage.py makemigrations\n python manage.py migrate")
  process.exit(1)
})

client.query(`CREATE TABLE IF NOT EXISTS matches (
  match_id SERIAL PRIMARY KEY,
  initiator integer REFERENCES users_user (id),
  target integer REFERENCES users_user (id),
  match boolean NOT NULL

)`).then((r) => {
  console.log("Creating matches table")
}).catch((e) => {
  console.log(e)
  console.log("Error creating matches table")
  process.exit(1)
})
client.query(`CREATE TABLE IF NOT EXISTS chat_room (
  chat_room_id SERIAL PRIMARY KEY,
  user1 integer REFERENCES users_user (id),
  user2 integer REFERENCES users_user (id)
)`).then((r) => {
  console.log("Creating chat_room table")
}).catch((e) => {
  console.log(e)
  console.log("Error creating chat_room table")
  process.exit(1)
})

client.query(`CREATE TABLE IF NOT EXISTS chat_table (
  chat_id integer REFERENCES chat_room (chat_room_id),
  message TEXT NOT NULL
)`).then((r) => {
  console.log("Creating chat_table table")
}).catch((e) => {
  console.log(e)
  console.log("Error creating chat_table table")
  process.exit(1)
})


// Routes
const profile_service = require('./routes/profile_service')

app.use(express.static('public'));



// Attaching middlewares the ExpressJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// Area for routes

app.use('/profile', profile_service);




// Starting the Server
http.listen(PORT, () => {
  console.log(`Lakeinder Profile_Matching Server. v1.0.0 [DEVELOPMENT] \n Listening on port ${PORT}`);
})