const express = require('express');
const url = require('../models/url');
const router = express.Router();
router.get('/signup', (req, res) => {
    return res.render('signup');
});
router.get('/login', (req, res) => {
    return res.render('login');
});
router.get('/', async (req, res) => {
    const allurls = await url.find({});
    return res.render('home', { urls: allurls });
});


module.exports = router;