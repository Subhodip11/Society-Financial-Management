const router = require('express').Router();
const verifier = require('../middlewares/tokenVerifier');
const registrationModel = require('../schema/SocietyRegistration');


router.post("/searchSociety", verifier, (req, res) => {
    const { option, searchVal } = req.body;
    console.log(searchVal, option)
    if (option === '1_1') {
        registrationModel.findOne({ societyID: Number(searchVal) }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            return res.json({ isAuthenticated: true, data: doc })

        })
    } else if (option === '2_1') {
        registrationModel.findOne({ societyName: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            return res.json({ isAuthenticated: true, data: doc })

        })
    } else if (option === '3_1') {
        registrationModel.find({ city: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            return res.json({ isAuthenticated: true, data: doc })

        })
    } else if (option === '4_1') {
        registrationModel.findOne({ pincode: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }

            return res.json({ isAuthenticated: true, data: doc })

        })
    }
})

module.exports = router;