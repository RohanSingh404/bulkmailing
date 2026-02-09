const ses = require("../utils/ses");

const sendMail = async (emails, subject, html , text) => {
  if (!Array.isArray(emails)) emails = [emails];
  const params = {
    Destination: {
      ToAddresses: emails,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },
        Text: { 
          Charset: "UTF-8",
          Data: text || "Your email client does not support HTML emails." 
        }
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: process.env.AWS_SES_FROM,
  };

  return ses.sendEmail(params).promise();
};

module.exports = sendMail;
