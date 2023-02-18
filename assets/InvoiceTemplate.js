module.exports = ({
  invoiceNumber,
  companyName,
  city,
  street,
  state,
  zip,
  gstin,
  estimateDate,
  items,
}) => {
  const today = new Date();

  function getDeliveryItemsHTML(items) {
    let data = '';
    let itemNumber = 1;
    function cgstTaxInd(qty, rate, discount) {
      const cgstTax = qty * rate * (1 - discount / 100) * (9 / 100);
      return cgstTax;
    }
    for (let item of items) {
      data += `
           <tr style="height: 48pt">
            <td class="tableStyleBorder" style="width: 20pt">
              <p
                class="s2"
                style="padding-top: 1pt; text-indent: 0pt; text-align: center"
              >
                ${itemNumber}
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 111pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-left: 4pt;
                  padding-right: 9pt;
                  text-indent: 0pt;
                  text-align: left;
                "
              >
                ${item.name}
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 39pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-left: 4pt;
                  text-indent: 0pt;
                  text-align: left;
                "
              >
               830210
              </p>
              <p
                class="s2"
                style="padding-left: 4pt; text-indent: 0pt; text-align: left"
              >
                10
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 44pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-left: 19pt;
                  text-indent: 0pt;
                  text-align: left;
                "
              >
                ${item.qty}
              </p>
              <p
                class="s2"
                style="padding-left: 27pt; text-indent: 0pt; text-align: left"
              >
                Pcs
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 43pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
                ${item.rate}
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 42pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-left: 12pt;
                  text-indent: 0pt;
                  text-align: left;
                "
              >
                ${item.discount}%
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 45pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
                9%
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 44pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
                ${cgstTaxInd(item.qty, item.rate, item.discount)}
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 43pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
                9%
              </p>
            </td>
            <td class="tableStyleBorder" style="width: 43pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
                 ${cgstTaxInd(item.qty, item.rate, item.discount)}
              </p>
            </td>
            <td  class="tableStyleBorder" style="width: 52pt">
              <p
                class="s2"
                style="
                  padding-top: 1pt;
                  padding-right: 3pt;
                  text-indent: 0pt;
                  text-align: right;
                "
              >
               ${item.qty * item.rate * (1 - item.discount / 100).toFixed(2)}
              </p>
            </td>
          </tr>
    `;
      itemNumber++;
    }
    return data;
  }

  const totalAmountAfterDiscount = items.reduce(
    (acc, item) => acc + (item.qty * item.rate * (100 - item.discount)) / 100,
    0
  );

  const cgstTax = (totalAmountAfterDiscount * 9) / 100;
  const sgstTax = (totalAmountAfterDiscount * 9) / 100;

  const total = totalAmountAfterDiscount + cgstTax + sgstTax;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>invoice PDF</title>
    <style>
      p {
        margin: 0px;
      }
      main {
        width: 100%;
        margin: 60px 40px;
        border: 1px solid black;
      }
      header {
        width: 100%;
        height: 200px;
        border-bottom: 1px solid black;
      }
      .verticalLine {
        border-left: 1px solid black;
        height: 223px;
        position: absolute;
        top: 261px;
        left: 494px;
      }
      .logo {
        position: absolute;
        top: 143px;
        left: 74px;
      }
      .CompanyInfo {
        position: absolute;
        left: 271px;
        top: 98px;
        line-height: 1.4;
      }
      .perfor {
        position: absolute;
        font-size: 31px;
        top: 216px;
        left: 699px;
      }

      .billID {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid black;
      }
      .billShip {
        width: 100%;
        height: 25px;
        background-color: #e7e9eb;
        border-bottom: 1px solid black;
      }
      .address {
        width: 100%;
        height: 146px;
      }
      table,
      th,
      td {
        border: 0.5px solid black;
        border-collapse: collapse;
      }
      .tableStyleBorder {
        border-top-style: solid;
        border-top-width: 1pt;
        border-top-color: #000000;
        border-left-style: solid;
        border-left-width: 1pt;
        border-left-color: #000000;
        border-bottom-style: solid;
        border-bottom-width: 1pt;
        border-bottom-color: #000000;
        border-right-style: solid;
        border-right-width: 1pt;
        border-right-color: #000000;
      }
      .s1 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 14pt;
      }
      .s2 {
        color: black;
        font-family: 'Microsoft Sans Serif', sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s3 {
        color: black;
        font-family: 'Microsoft Sans Serif', sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 24pt;
      }
      .s4 {
        color: #333;
        font-family: 'Microsoft Sans Serif', sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 10pt;
      }
      .s5 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10pt;
      }
      .s6 {
        color: #333;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 10pt;
      }
      .s7 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: normal;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;
      }
      .s8 {
        color: #444;
        font-family: 'Microsoft Sans Serif', sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 9.5pt;
      }
      .s9 {
        color: black;
        font-family: Arial, sans-serif;
        font-style: italic;
        font-weight: bold;
        text-decoration: none;
        font-size: 11pt;
      }
      .s10 {
        color: black;
        font-family: 'Microsoft Sans Serif', sans-serif;
        font-style: normal;
        font-weight: normal;
        text-decoration: none;
        font-size: 8pt;
      }
      table,
      tbody {
        vertical-align: top;
        overflow: visible;
      }
    </style>
  </head>
  <body style="width: 50%; font-family: sans-serif">
    <main>
      <header>
        <div class="logo">
          <img
            style="width: 127px"
            src="https://cdn.shopify.com/s/files/1/0566/3182/0333/files/LOGO-color.png?v=1647674394"
            alt="logo"
          />
        </div>
        <div class="CompanyInfo">
          <p style="font-size: 21px; font-weight: bolder">
            Depo Solutions Private Limited
          </p>
          <p>77/1/A, Christopher Road, Topsia,</p>
          <p>Kolkata - 700046</p>
          <p>West Bengal</p>
          <p>GSTIN: 19AAJCD1058P1Z4</p>
        </div>
        <div class="perfor">Proforma Invoice</div>
      </header>
      <div class="billID">
        <p style="position: absolute; left: 56px">#</p>
        <p style="position: absolute; left: 276px">: DEPO/KOL/PI/${invoiceNumber}</p>
        <p style="position: absolute; top: 284px; left: 56px">Estimate Date</p>
        <p style="position: absolute; top: 284px; left: 276px">: ${estimateDate}</p>
        <div class="verticalLine"></div>
        <p style="position: absolute; left: 509px">Place Of Supply</p>
        <p style="position: absolute; left: 752px">: West Bengal (19)</p>
      </div>
      <div class="billShip">
        <p style="position: absolute; left: 56px">Bill To</p>
        <p style="position: absolute; left: 509px">Ship To</p>
      </div>
      <div class="address">
        <div
          style="position: absolute; top: 349px; left: 56px; line-height: 1.6"
        >
          <p>${companyName.toUpperCase()}</p>
          <p>${street.charAt(0).toUpperCase() + street.slice(1)}</p>
          <p>${city.charAt(0).toUpperCase() + city.slice(1)} - ${zip}</p>
          <p>${state.charAt(0).toUpperCase() + state.slice(1)}</p>
          <p>GSTIN: ${gstin}</p>
        </div>
        <div
          style="position: absolute; top: 349px; left: 511px; line-height: 1.6"
        >
           <p>${companyName.toUpperCase()}</p>
          <p>${street.charAt(0).toUpperCase() + street.slice(1)}</p>
          <p>${city.charAt(0).toUpperCase() + city.slice(1)} - ${zip}</p>
          <p>${state.charAt(0).toUpperCase() + state.slice(1)}</p>
          <p>GSTIN: ${gstin}</p>
        </div>
      </div>

      <table style="width: 100%">
        <thead style="background-color: #e7e9eb">
          <tr>
            <th class="tableStyleBorder" rowspan="2">#</th>
            <th class="tableStyleBorder" rowspan="2">Item &amp; Description</th>
            <th class="tableStyleBorder" rowspan="2">HSN/SAC</th>
            <th class="tableStyleBorder" rowspan="2">Qty</th>
            <th class="tableStyleBorder" rowspan="2">Rate</th>
            <th class="tableStyleBorder" rowspan="2">Discount</th>
            <th class="tableStyleBorder" colspan="2">CGST</th>
            <th class="tableStyleBorder" colspan="2">SGST</th>
            <th class="tableStyleBorder" rowspan="2">Amount</th>
          </tr>
          <tr>
            <th class="tableStyleBorder" >%</th>
            <th class="tableStyleBorder" >Amt</th>
            <th class="tableStyleBorder" >%</th>
            <th class="tableStyleBorder" >Amt</th>
          </tr>
        </thead>
        <tbody>
          ${getDeliveryItemsHTML(items)}
        </tbody>
      </table>
           <table style="width: 100%">
        <tr style="height: 40pt">
          <td
            style="
              width: 299pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-top-color: #000000;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="6"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
            <p
              class="s2"
              style="padding-left: 5pt; text-indent: 0pt; text-align: left"
            >
              Total In Words
            </p>
            <p
              class="s9"
              style="padding-left: 5pt; text-indent: 0pt; text-align: left"
            >
              Indian Rupee Two Thousand One Hundred Fifty-Three and Fifty Paise
            </p>
            <p
              class="s9"
              style="
                padding-left: 5pt;
                text-indent: 0pt;
                line-height: 9pt;
                text-align: left;
              "
            >
              Only
            </p>
          </td>
          <td
            style="
              width: 45pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-top-color: #000000;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 130pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-top-color: #000000;
            "
            colspan="3"
          >
            <p
              class="s2"
              style="
                padding-top: 3pt;
                padding-left: 45pt;
                padding-right: 46pt;
                text-indent: 7pt;
                line-height: 135%;
                text-align: left;
              "
            >
              Sub Total
            </p>
             <p
              class="s2"
              style="padding-left: 42pt; text-indent: 0pt; text-align: left"
            >
              CGST (9%)
            </p>
            <p
              class="s2"
              style="padding-left: 42pt; text-indent: 0pt; text-align: left"
            >
              SGST (9%)
            </p>
          </td>
          <td
            style="
              width: 52pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-top-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
          >
            <p
              class="s2"
              style="
                padding-top: 3pt;
                padding-right: 4pt;
                text-indent: 0pt;
                text-align: right;
              "
            >
              ${totalAmountAfterDiscount}
            </p>
            <p
              class="s2"
              style="
                padding-top: 3pt;
                padding-right: 4pt;
                text-indent: 0pt;
                text-align: right;
              "
            >
              ${cgstTax}
            </p>
            <p
              class="s2"
              style="
                padding-top: 3pt;
                padding-right: 4pt;
                text-indent: 0pt;
                text-align: right;
              "
            >
             ${sgstTax}
            </p>
          </td>
        </tr>
        <tr style="height: 13pt">
          <td
            style="
              width: 299pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="6"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 45pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-bottom-color: #000000;
            "
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 130pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-bottom-color: #000000;
            "
            colspan="3"
          >
            <p
              class="s5"
              style="
                padding-left: 63pt;
                padding-right: 46pt;
                text-indent: 0pt;
                text-align: center;
              "
            >
              Total
            </p>
          </td>
          <td
            style="
              width: 52pt;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-bottom-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
          >
            <p
              class="s5"
              style="padding-right: 4pt; text-indent: 0pt; text-align: right"
            >
              ₹${total}
            </p>
          </td>
        </tr>
        <tr style="height: 40pt">
          <td
            style="
              width: 299pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="6"
          >
            <p
              class="s2"
              style="
                padding-top: 6pt;
                padding-left: 5pt;
                text-indent: 0pt;
                text-align: left;
              "
            >
              Looking forward for your business.
            </p>
          </td>
          <td
            style="
              width: 227pt;
              border-top-style: solid;
              border-top-width: 1pt;
              border-top-color: #000000;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="5"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
        </tr>
        <tr style="height: 33pt">
          <td
            style="
              width: 299pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="6"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
          <td
            style="
              width: 227pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-bottom-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="5"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
            <p
              class="s2"
              style="
                padding-left: 74pt;
                text-indent: 0pt;
                line-height: 8pt;
                text-align: left;
              "
            >
              Authorized Signature
            </p>
          </td>
        </tr>
        <tr style="height: 249pt">
          <td
            style="
              width: 526pt;
              border-left-style: solid;
              border-left-width: 1pt;
              border-left-color: #000000;
              border-bottom-style: solid;
              border-bottom-width: 1pt;
              border-bottom-color: #000000;
              border-right-style: solid;
              border-right-width: 1pt;
              border-right-color: #000000;
            "
            colspan="11"
          >
            <p style="text-indent: 0pt; text-align: left"><br /></p>
          </td>
        </tr>
      </table>
    </main>
  </body>
</html>

   `;
};
