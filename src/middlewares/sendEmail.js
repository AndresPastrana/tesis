const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASSWORD,
  },
});



  

const sendEmail = async(mailDetails,callback)=>{

  try {
    const info = await transporter.sendMail(mailDetails)
    callback(info);
  } catch (error) {
    console.log(error);
  } 
}


module.exports = {
    sendEmail
}