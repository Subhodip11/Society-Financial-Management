const router = require('express').Router();
const verifier = require('../middlewares/tokenVerifier');
const registrationModel = require('../schema/SocietyRegistration');


router.post("/searchSociety", verifier, (req, res) => {
    const { option, searchVal } = req.body;
    console.log(searchVal, option)
        //search by society ID
    if (option === '1_1') {
        registrationModel.findOne({ societyID: Number(searchVal) }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            if (doc) {
                let temp = [];
                temp.push(doc);
                return res.json({ isAuthenticated: true, data: temp })
            } else {
                return res.json({ isAuthenticated: true, data: null })
            }


        })
    }
    //serach by society name
    else if (option === '2_1') {
        registrationModel.findOne({ societyName: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            if (Array.isArray(doc))
                return res.json({ isAuthenticated: true, data: doc })
            else {
                if (doc) {
                    let temp = [];
                    temp.push(doc);
                    return res.json({ isAuthenticated: true, data: temp })
                } else {
                    return res.json({ isAuthenticated: true, data: null })
                }
            }

        })
    }
    //search by city name
    else if (option === '3_1') {
        registrationModel.find({ city: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            return res.json({ isAuthenticated: true, data: doc })

        })
    }
    //search by pincode 
    else if (option === '4_1') {
        registrationModel.findOne({ pincode: searchVal }, (err, doc) => {
            if (err) {
                return res.json({ isAuthenticated: true, data: null })
            }
            if (Array.isArray(doc))
                return res.json({ isAuthenticated: true, data: doc })
            else {
                if (doc) {
                    let temp = [];
                    temp.push(doc);
                    return res.json({ isAuthenticated: true, data: temp })
                } else {
                    return res.json({ isAuthenticated: true, data: null })
                }

            }
        })
    }
})

module.exports = router;