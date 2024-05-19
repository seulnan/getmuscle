const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');


/////////////////////////////Routes///////////////////////////////////

const homeRoute = require('./api/home.cjs');
const loginRoute = require('./api/auth.cjs');

//////////////////////////////////////////////////////////////////////


dotenv.config();
const app = express();


const {PORT, MONGO_URI} = process.env;


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'kihfjsk32839j',
    resave:false,
    saveUninitialized:true,
}));


app.use('/', homeRoute);
app.use('/', loginRoute);


mongoose
    .connect(MONGO_URI, {dbName: "dkeun"})
    .then(()=>console.log('Successfully connected to mongodb'))
    .catch(e=>console.error(e));


app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`));



