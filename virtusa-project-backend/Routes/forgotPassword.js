const verifier = require('../middlewares/tokenVerifier');

const router = require('express').Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dummyuser33214@gmail.com',
        pass: 'aabjlftyxkxoytli'
    },
    port: 465,
    host: 'smtp.gmail.com'
})


router.post('/forgotPassword', verifier, (req, res) => {
    const { email } = req.body;

    transporter.sendMail({
        from: 'dummyuser33214@gmail.com',
        to: email,
        subject: 'OTP for changing password',
        text: 'One time password for changing the admin password is 33514'
    }, (err, response) => {
        if (err) {
            console.log(err)
            res.json({ isAuthenticated: true, data: err.message })
        } else {
            console.log(response.response)
            res.json({ isAuthenticated: true, data: response.response })
        }
    })
})

module.exports = router