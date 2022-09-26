const app = require('express').Router();
const jwt = require('jsonwebtoken');


app.post('/loginAdmin', async(req, res) => {
    if (process.env.ADMIN_USERNAME === req.body.username && process.env.ADMIN_PASSWORD === req.body.password) {
        jwt.sign({ username: process.env.ADMIN_USERNAME }, process.env.JWT_SECRET_KEY, { expiresIn: "12h" }, (err, token) => {
            // console.log(token)
            if (err) {
                console.log("Error in jwt.sign", err)
                res.json({ isAuthenticated: false, token: null })
            } else {

                res.json({ isAuthenticated: true, token })
            }
        });

    } else {
        res.json({ isAuthenticated: false, token: null })
    }
})
module.exports = app