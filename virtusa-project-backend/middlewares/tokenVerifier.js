const jwt = require('jsonwebtoken');

const verifier = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(token)
    if (token !== 'null' || token !== 'undefined') {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({ isAuthenticated: false, token: null })
            } else {
                req.authenticate = true;
                req.token = decoded
                next();
            }
        });

    } else {
        req.authenticate = false;
        res.json({ isAuthenticated: false, token: null })
    }
}

module.exports = verifier