const express = require('express');
const app = express();

const PORT = 4000;

// routes
const productRoutes = require('./routes');

const mongoose = require('mongoose');
mongoose
  .connect()
  .then(() => console.log('mongoose running...'))
  .catch((error) => console.error(error));

// middlewares
app.use(express.json());

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.use('/api/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// error handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app;
