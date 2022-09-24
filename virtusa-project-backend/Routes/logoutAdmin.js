const app = require('express').Router();

app.get('/logout', (req, res) => {
    res.json({ isAuthenticated: false, token: null })
})

module.exports = app;