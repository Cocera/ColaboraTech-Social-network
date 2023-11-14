const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "frances0688@gmail.com",
        pass: "cqeitwahsshkdeuu"
    }
});
module.exports = transporter;
