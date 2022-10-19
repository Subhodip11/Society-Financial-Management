const router = require('express').Router();
const bcrypt = require('bcryptjs');
const loginModel = require('../schema/AdminLogin');

router.post('/forgotPassword', (req, res) => {
    const { newPassword } = req.body;

    loginModel.findOne({ username: process.env.ADMIN_USERNAME }, (err, data) => {
        if (err) {
            return res.json({ data: 'Error while finding user' })
        } else {
            // console.log(data.id, data.username, newPassword)
            bcrypt.hash(newPassword, 10)
                .then(hash => {
                    loginModel.findByIdAndUpdate({ _id: data.id }, { $set: { password: hash } }, { new: true, upsert: true }).then(doc => {
                        return res.json({ data: 'Successfully updated password' });
                    }).catch(err => res.json({ data: 'Error while updating password' }))
                })
        }

    })
})

module.exports = router;