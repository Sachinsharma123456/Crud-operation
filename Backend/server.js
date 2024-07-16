const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const bookRouter = require('./routes/books');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/books', bookRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
