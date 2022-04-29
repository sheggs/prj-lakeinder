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
}).catch((e) => {
  console.log("Run auth_service migrations first.  cd ../auth_service\npython manage.py makemigrations\n python manage.py migrate")
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
app.use('/', (req,res) => {
  console.log("Hey home")
});



// Starting the Server
http.listen(PORT, () => {
  console.log(`Lakeinder Profile_Matching Server. v1.0.0 [DEVELOPMENT] \n Listening on port ${PORT}`);
})