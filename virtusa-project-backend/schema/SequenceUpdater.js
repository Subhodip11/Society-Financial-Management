const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: "autoInc"
    },
    counter: {
        type: Number,
        required: true,
        default: 1
    }
})

const model = mongoose.model('Sequence_Counter', sequenceSchema);

module.exports = model;