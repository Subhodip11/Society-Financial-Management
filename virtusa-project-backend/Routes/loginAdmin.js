const app = require('express').Router();
const jwt = require('jsonwebtoken');
const loginModel = require('../schema/AdminLogin');
const bcrypt = require('bcryptjs');

app.post('/loginAdmin', async(req, res) => {

    const { username, password } = req.body;
    loginModel.findOne({})
        .then(doc => {
            // console.log(doc)
            const docUsername = doc.username,
                docPassword = doc.password;

            bcrypt.compare(password, docPassword).then(async(response) => {
                    if (response && docUsername === username) {
                        await loginModel.findOneAndUpdate({ username: docUsername }, { $set: { checkLimit: 0 } }, { new: true, upsert: true })
                        jwt.sign({ username: docUsername }, process.env.JWT_SECRET_KEY, { expiresIn: "6h" }, (err, token) => {
                            if (err) {
                                console.log("Error in jwt.sign", err)
                                res.json({ isAuthenticated: false, token: "Error occured while authenticating" })
                            } else {
                                res.json({ isAuthenticated: true, token, data: 'Successfully authenticated' })
                            }
                        });
                    } else {
                        if (doc.checkLimit < 3) {
                            loginModel.findOneAndUpdate({ username: docUsername }, { $inc: { checkLimit: 1 } }, { new: true, upsert: true }, (err, limit) => {
                                if (err) {
                                    console.log("Error occured while increasing check limit")
                                } else {
                                    console.log("Successfully incremented check limit, new limit val ", limit.checkLimit)
                                }
                            })
                            return res.json({ isAuthenticated: false, token: null, data: 'Incorrect Password or Username' })
                        } else {
                            console.log("Email has to be sent from here for activating the account")
                            return res.json({ isAuthenticated: false, token: null, data: 'Account reached max limit of unsuccessfull tries 3/3' })
                        }
                    }
                })
                .catch(err => res.json({ isAuthenticated: false, token: null, data: 'Error occured while comparing passwords' }))

        }).catch(err => res.json({ isAuthenticated: false, token: null }))
})
module.exports = app