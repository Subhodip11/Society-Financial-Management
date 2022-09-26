const router = require('express').Router();
const verifier = require('../middlewares/tokenVerifier');
const registrationModel = require('../schema/SocietyRegistration');

router.post('/updateSociety', verifier, (req, res) => {
    const { societyID, societyName, city, pincode } = req.body
    console.log(societyID, societyName, city, pincode)
    registrationModel.findOneAndUpdate({ societyID: Number(societyID) }, {
        $set: {
            societyName,
            city,
            pincode
        }
    }, { new: true, upsert: true }, (err, doc) => {
        if (err) {
            return res.json({ isAuthenticated: true, data: "Error occured while updating..." })
        } else {
            return res.json({ isAuthenticated: true, data: "Successfully updated..." });
        }
    })
})

module.exports = router;