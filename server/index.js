require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routers/user-router');
const errorMiddleware = require('./middlewares/error-middleware');
const iotRouter = require('./routers/iot-router');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
   // {
   //    credentials: true,
   //    origin: process.env.CLIENT_URL
   // }
));

app.use('/api', userRouter);
app.use('/api', iotRouter);
app.use(errorMiddleware)

function logMessage() {
   console.log("This message is logged every 15 seconds.");
}

setInterval(logMessage, 15000);

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();