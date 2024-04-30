import express from 'express';

const app = express();

app.use('/', (req, res) => {
  return res.json('Hello from the Food Order Backend!')
})

app.listen(8000, () => {
  console.log('App is listeting to port 8000')
})