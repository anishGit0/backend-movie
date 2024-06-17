const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log('MongoDB database connection established successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

