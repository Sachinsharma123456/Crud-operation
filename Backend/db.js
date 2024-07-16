const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sachin:sachin@sachin.b0591rt.mongodb.net/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
