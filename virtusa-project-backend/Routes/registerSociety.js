const app = require('express').Router();
const registrationModel = require('../schema/SocietyRegistration');
const sequenceSchema = require('../schema/SequenceUpdater');
const verifier = require('../middlewares/tokenVerifier')

app.get('/societies', verifier, (req, res) => {
    registrationModel.find({}).then(data => {
        res.json({ data, isAuthenticated: req.authenticate, token: req.token })
    }).catch(err => console.log(err));

})

app.post('/registerSociety', verifier, (req, res) => {
    if (req.body) {
        registrationModel.create({
            societyName: req.body.societyName,
            city: req.body.city,
            pincode: req.body.pincode
        }).then(data => {
            res.json({ data: 'Documnet saved successfully...', isAuthenticated: req.authenticate, token: req.token })
        }).catch(err => console.log("Error occured while saving to database", err.message));

    } else {
        res.json({ data: 'Unable to get data', isAuthenticated: req.authenticate, token: null })
    }
});


module.exports = app;