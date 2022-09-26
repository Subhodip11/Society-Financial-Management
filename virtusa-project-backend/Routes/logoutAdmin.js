const verifier = require('../middlewares/tokenVerifier');

const app = require('express').Router();

app.get('/logoutAdmin', verifier, (req, res) => {
    res.json({ isAuthenticated: false, token: null })
})

module.exports = app;