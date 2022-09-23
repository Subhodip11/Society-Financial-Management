const app = require('express').Router();
const registrationModel = require('../schema/SocietyRegistration');
const sequenceSchema = require('../schema/SequenceUpdater');

app.get('/socities', (req, res) => {
    registrationModel.find({}).then(data => {
        res.json({ data })
    }).catch(err => console.log(err));

})

app.post('/registerSociety', (req, res) => {
    if (req.body) {

        registrationModel.create({
            societyName: req.body.societyName,
            city: req.body.city,
            pincode: req.body.pincode
        }).then(data => {
            res.json('Documnet saved successfully...')
        }).catch(err => console.log("Error occured while saving to database", err.message));

    } else {
        res.json({ mssg: 'Unable to get data' })
    }
});


module.exports = app;