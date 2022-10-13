const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const hbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override')

const route = require('./routes')
const db = require('./config/db');

// for parsing application/json
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Template Engine
app.engine('.hbs', hbs.create({extname:'.hbs'}).engine);

// Use view engine & change view path to 'views' folder
app.set('view engine', '.hbs');
app.set("views", path.join(__dirname, "resources","views"));

//Change static path to 'public' folder
app.use(express.static(path.join(__dirname, "public"))); 

// Overwrite method
app.use(methodOverride('_method'));

// Connect database
db.connect();

// Route
route(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})