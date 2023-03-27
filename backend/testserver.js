const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connect = require('./config/testdb')
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/', require('./routes/teamRoutes'));
app.use('/', require('./routes/playerRoutes'));
app.use(errorHandler)