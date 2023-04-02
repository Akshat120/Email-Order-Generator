const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient({ authorizationToken: process.env.TESTKEY });

exports.send = async function (email, code) {
  const { requestId } = await courier.send({
    message: {
      to: {
        email: email,
      },
      template: "65RH50J2Z241FNKHS47CA7V2Q3SP",
      data: {
        name: email.split("@")[0],
        otp: code,
      },
    },
  });
};

exports.sendReceipt = async function (data, usrName) {
  email = data.toemail;
  products = [];

  total_bill = 0;
  for (let i = 0; i < data.pid.length; i++) {
    products.push([
      data.pid[i],
      data.ppp[i],
      data.qty[i],
      data.ppp[i] * data.qty[i],
    ]);
    total_bill += data.ppp[i] * data.qty[i];
  }

  const { requestId } = await courier.send({
    message: {
      to: {
        email: email,
      },
      template: "14Q13KCGP84R7GP6Q4JNPRXH2DAQ",
      data: {
        usrName: usrName,
        customerName: email.split("@")[0],
        companyName: "EOS Team",
        products: products,
        total_bill: total_bill,
      },
    },
  });
};
