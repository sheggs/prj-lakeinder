const express = require('express');
const app = express();
const path = require('path');
// const cookieParser = require('cookie-parser');
// const cridentials = require('./middleware/cridentials');

const PORT = process.env.PORT || 3500;

// // custom middleware logger
// app.use(logger);


// //Handle options cridentials check - before CORS!
// // and fetch cookies cridentials requirement
// app.use(cridentials);

// //use cors
// app.use(cors(corsOptions));

//build-in middleware to handle urlencoded data
// data from 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
// app.use(cookieParser());

//make image folder publically available, serve static files
app.use(express.static(path.join(__dirname, '/images')));


// routes
app.use('/', require('./routes/images'));

//app.use('/')
app.all('/*', (req, res) => {
   res.status(404);
   res.send("Path not accepted");
});

// app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
