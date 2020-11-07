const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./routes');
const connectDatabase = require('./helpers/database/connectDatabase');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const cookieParser = require('cookie-parser');

    
app.use(cookieParser());

app.use(cors( {
    origin: 'http://localhost:4200',
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Cookie'],
    credentials: true
} ));

dotenv.config({
    path: './server/config/config.env'
});

connectDatabase();

app.use(express.json());

app.use('/', router);

app.use(customErrorHandler);

PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('server running on: ' + PORT);
});