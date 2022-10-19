const router = require('express').Router();
//const nodemailer = require('nodemailer');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

router.post('/forgotPassword', (req, res) => {
    const { mobileNumber } = req.body;
    let otp = Math.floor(Math.random() * 10);
    for (let i = 0; i < 5; i++)
        otp = otp * 10 + Math.floor(Math.random() * 10)
    client.messages
        .create({
            body: `Your OTP for changing password - ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobileNumber
        })
        .then(message => {
            console.log(message.sid)
            res.json({ data: 'OTP generated Successfully', otp })
        }).catch(err => console.log(err.message))
})

module.exports = router