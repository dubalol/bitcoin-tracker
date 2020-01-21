const express = require('express');
const path = require('path');

const receiver = require('./receiver');

const app = express();

const PORT = 3000;

// Test request
app.use('/', (req, res) => {
  // res.send('Hello World');
  const html = path.resolve(__dirname, '../index.html');
  res.sendFile(html);
});


receiver.getPrices();

// have app listen to port
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
