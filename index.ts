import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config();

import { AdminRoute, VendorRoute } from './src/routes';
import { MONGO_URI } from './src/config';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

mongoose.connect(MONGO_URI!).then(result => {
  console.log(result)
}).catch(err => console.log('error' + err))

app.listen(8000, () => {
  console.clear();
  console.log('App is listeting to port 8000');
})