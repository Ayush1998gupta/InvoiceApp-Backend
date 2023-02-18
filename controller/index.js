const Invoice = require('../model/Invoice');
const pdf = require('html-pdf');
const pdfTemplate = require('../assets/InvoiceTemplate');

module.exports.getHome = async function (req, res) {
  res.status(200).send({
    msg: 'Hi there, welcome to Invoice API.',
  });
};

module.exports.getInvoice = function (req, res) {
//   console.log(aaaaaaaa);
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
};
