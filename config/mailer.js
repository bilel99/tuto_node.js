let mailer = require('nodemailer')
let moduleSmtpTransport = require("nodemailer-smtp-transport")

/******************************
 * Configuration mailer - SMTP
 *****************************/
let smtpTransport = mailer.createTransport(moduleSmtpTransport({
    host : 'smtp.laposte.net',
    secureConnection : false,
    port: 587,
    auth: {
        user: "bil.bekkouche@laposte.net",
        pass: "bb2K15eq"
    }
}))

module.exports = smtpTransport