import mongoose from 'mongoose';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import session, {SessionOptions} from 'express-session';
import cors from 'cors';
import * as shopping from './functions/shopping.js';
/////////////////////////////Routes///////////////////////////////////

import homeRoute from './api/home.js';
import loginRoute from './api/auth.js';
import seongun from './api/seongun.js';

//////////////////////////////////////////////////////////////////////
//var exports : Object = {};

dotenv.config();
const app = express();


const {PORT, MONGO_URI} = process.env;

const sessionOptions : SessionOptions={
    secret: 'kihfjsk32839j',
    resave:false,
    saveUninitialized:true,
}
app.set('view engine', 'ejs');
app.use(express.static('dist'));
app.use('/node_modules',express.static('node_modules'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session(sessionOptions));
app.use(cors());
//app.use('/functions',express.static('functions'));
//app.use('/config',express.static('config'));
//app.use('/schemas',express.static('schemas'));
//app.use(express.static('api'));

app.use('/', homeRoute);
app.use('/', loginRoute);
app.use('/', seongun);


mongoose
    .connect(MONGO_URI as string, {dbName: "dkeun"})
    .then(()=>console.log('Successfully connected to mongodb'))
    .catch(e=>console.error(e));


app.listen(parseInt(PORT as string), ()=>{
    console.log(`Server listening on port ${PORT}`);
});



