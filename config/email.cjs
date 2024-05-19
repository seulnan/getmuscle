const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const {EMAIL_SERVICE, EMAIL_HOST, EMAIL_USER, EMAIL_PASS} = process.env;

export const smtpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    service: EMAIL_SERVICE,
    host: EMAIL_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:EMAIL_USER,
        pass:EMAIL_PASS
    },
    tls:{
        rejectUnauthorized:false
    }
});