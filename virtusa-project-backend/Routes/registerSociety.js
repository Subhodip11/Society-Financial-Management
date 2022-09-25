const app = require('express').Router();
const registrationModel = require('../schema/SocietyRegistration');
const sequenceUpdater = require('../schema/SequenceUpdater');
const verifier = require('../middlewares/tokenVerifier')

app.get('/societies', verifier, (req, res) => {
    registrationModel.find({}).then(data => {
        res.json({ data, isAuthenticated: req.authenticate, token: req.token })
    }).catch(err => console.log(err));

})

app.post('/registerSociety', verifier, (req, res) => {
    if (req.body) {
        sequenceUpdater.findOneAndUpdate({ _id: "autoInc" }, { $inc: { counter: 1 } }, { new: true, upsert: true }, (err, doc) => {
            if (err) {
                console.log("Error occured while incrementing counter...")
            } else {
                const society = new registrationModel({
                    societyID: doc.counter,
                    societyName: req.body.societyName,
                    city: req.body.city,
                    pincode: req.body.pincode
                })
                society.save((err, data) => {
                    if (err) {
                        console.log("Error occured while saving to database", err.message)
                    } else {
                        res.json({ data: 'Documnet saved successfully...', isAuthenticated: req.authenticate, token: req.token });
                    }
                })

            }
        })


    } else {
        res.json({ data: 'Unable to get data', isAuthenticated: req.authenticate, token: null })
    }
});


module.exports = app;