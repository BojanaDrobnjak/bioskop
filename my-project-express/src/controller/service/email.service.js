const nodeMailer = require("nodemailer");

function sendConfirmationEmail(recepient, verificationCode) {
  let emailBody =
    "<p>Hello dear user, please confirm your accout, or don't, i don't care.</p> \n<label>Click here to install a virus http://localhost:4200/confirm-account/" +
    verificationCode +
    "</label>";
  let subject = "Bojana je party pooper!";
  let mailOptions = getMailOptionsObject(recepient, subject, emailBody);

  sendEmail(mailOptions);
}

function sendEmail(mailOptions) {
  console.log("Email body: ", mailOptions.body);
  let transporter = getTransporterObject();
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
}

function getMailOptionsObject(recepient, subject, emailBody) {
  return {
    to: recepient,
    subject: subject,
    html: emailBody
  };
}

function getTransporterObject() {
  return nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "salimsemozda@gmail.com",
      pass: "nesalimse1"
    }
  });
}

exports.sendConfirmationEmail = sendConfirmationEmail;
