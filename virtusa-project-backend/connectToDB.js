const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/SMS_SOCIETY_REGISTRATION';
module.exports.dbConnect = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err)
            return;
        }
        console.log('Connected with db successfully...');
    });
}