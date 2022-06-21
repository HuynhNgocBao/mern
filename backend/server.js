const express = require('express');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const route = require('./routes')
const {errorHandler} = require('./middlewares/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;
connectDB();

const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

route(app);
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`);
})