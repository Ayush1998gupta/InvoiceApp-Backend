require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env['PORT'] || 11000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use('/', require('./routes/index'));

//database
mongoose.set('strictQuery', true);
mongoose
  .connect(
    `mongodb+srv://Ayush1gupta:${process.env.MONGO_PASSWORD}@cluster0.gexk8id.mongodb.net/Invoices?retryWrites=true&w=majority`
  )
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb', err));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
