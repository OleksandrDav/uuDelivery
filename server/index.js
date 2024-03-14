require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routers/user-router');
const errorMiddleware = require('./middlewares/error-middleware');

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
app.use(errorMiddleware)
console.log(process.env.DB_URL);
console.log(typeof process.env.DB_URL);

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();