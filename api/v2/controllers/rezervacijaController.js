const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (req, res) => {
    try {
  
      const { recipient, subject, emailText } = req.body;

      console.log(req.body)

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.recipient,
        subject: subject,
        text: emailText
      });
  
      console.log(`Email sent to ${recipient}`);
      res.status(200).send('It worked')
    } catch (error) {
      console.log(`Error sending email: ${error}`);
      res.status(500).send(`It didnt work : ${error}`)
    }
};

exports.getAllRezervacijas = async (req, res) => {
    try {
      console.log("get all rezervacijas")
    } catch (error) {
      console.error(`Error sending email to ${recipient}: ${error}`);
    }
};