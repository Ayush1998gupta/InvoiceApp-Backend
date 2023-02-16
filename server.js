require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env['PORT'] || 11000;
var pdf = require('html-pdf');
const pdfTemplate = require('./InvoiceTemplate');

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.post('/getInvoice', (req, res) => {
  pdf.create(pdfTemplate(req.body)).toStream((err, pdfStream) => {
    if (err) {
      // handle error and return a error response code
      console.log(err);
      return res.sendStatus(500);
    } else {
      // send a status code of 200 OK
      res.statusCode = 200;
      // once we are done reading end the response
      pdfStream.on('end', () => {
        // done reading
        return res.end();
      });
      // pipe the contents of the PDF directly to the response
      pdfStream.pipe(res);
    }
  });
});

app.get('/', (req, res) => {
  res.status(200).send({
    msg: 'Hi there, welcome to Invoice API.',
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
