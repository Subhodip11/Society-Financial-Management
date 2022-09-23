const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
    societyName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
        length: 6
    }
})

const model = mongoose.model('Registration', registrationSchema);

module.exports = model;