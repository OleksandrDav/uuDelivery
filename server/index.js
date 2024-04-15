require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routers/user-router');
const errorMiddleware = require('./middlewares/error-middleware');
const iotRouter = require('./routers/iot-router');
const orderRouter = require('./routers/order-router');
const trackerRouter = require('./routers/tracker-router');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
   {
      credentials: true,
      origin: process.env.CLIENT_URL
   }
));

app.use('/api/auth', userRouter);
app.use('/api/iot', iotRouter);
app.use('/api/order', orderRouter);
app.use('/api/tracker', trackerRouter)

app.get('/test', (req, res) => {
   res.send('Server is pm2 running!');
});


app.use(errorMiddleware)

const start = async () => {
   try {
      await mongoose.connect(process.env.DB_URL);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   } catch (error) {
      console.log(error);
   }
}

start();