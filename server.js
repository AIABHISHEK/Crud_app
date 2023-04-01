const express = require('express');

const dotenv = require('dotenv');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const path = require('path');

const app = express();

const connectDB = require('./server/database/connection');

dotenv.config({ path: 'config.env' }); // create . env file for your system and assign path
const PORT = process.env.PORT||8080;

// log  request
app.use(morgan('dev'));

//database connection
connectDB();

//PARSE request
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set('view engine', 'ejs');

//app.set("views", /*path of folder when we store file other than view folder*/ )

// load assets

app.use('/css', express.static(path.join(__dirname, 'assets/css')));
app.use('/js', express.static(path.join(__dirname, 'assets/js')));
app.use('/img', express.static(path.join(__dirname, 'assets/img')));


//get routers
app.use("/", require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})