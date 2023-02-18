require('dotenv').config();
const express = require('express');
const app = express();
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

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
