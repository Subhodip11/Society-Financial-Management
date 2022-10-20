const router = require('express').Router();
const { CourierClient } = require("@trycourier/courier");
//setting up courier client 
const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN });

router.post("/emailVerification", async(req, res) => {
    const { email } = req.body;
    let otpGenerator = Math.floor(Math.random() * 9) + 1;
    for (let i = 0; i < 5; i++)
        otpGenerator = otpGenerator * 10 + Math.floor(Math.random() * 10)
    const { requestId } = await courier.send({
        message: {
            content: {
                title: "OTP verification code",
                body: "Your otp for login is {{otp}}"
            },
            data: {
                otp: otpGenerator
            },
            to: {
                email
            }
        }
    });
    console.log(requestId)
    if (requestId) {
        res.json({ data: "Email sent successfully", otp: otpGenerator })
    } else {
        res.json({ data: "Email was not sent", otp: null })
    }
})


module.exports = router;