const mongoose = require('mongoose');
const sequenceUpdater = require('./SequenceUpdater.js')

const registrationSchema = new mongoose.Schema({
    societyID: {
        type: Number,
        required: true,
        unique: true
    },
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
}, { timestamps: true })

const model = mongoose.model('Registration', registrationSchema);


module.exports = model;