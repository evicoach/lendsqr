import express from 'express';
import path from 'path';
import dontenv from 'dotenv';
dontenv.config({})
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import router from './routes/v1';



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);
app.use((err, req, res, next) => {
    res.status(err && err.status || 500);
    res.send({ error: err && err.message || "An error occurred" });
});

export default app;
