const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    username: {
        type: String,

    },
    password: {
        type: String,

    },
    checkLimit: {
        type: Number,
        default: 0
    }
})

const model = mongoose.model('admin_login', schema);
model.find({}).then(doc => {
    if (doc.length == 0) {
        bcrypt.hash(process.env.ADMIN_PASSWORD, 10, (err, hash) => {
            new model({
                username: process.env.ADMIN_USERNAME,
                password: hash,
                checkLimit: 0
            }).save()
        })

    }
}).catch(err => console.log("Error occured while storing default values in adminlogin schema"))
module.exports = model;