
const shortid = require('shortid');
const url = require('../models/url');
async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "URL is required"});
    const shortID = shortid();
    await url.create({
        shortID : shortID,
        redirectURL : body.url,
        visitHistory : [],
    });
    return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await url.findOne({  shortID : shortId });
    return res.json({
        totalClicks : result.visitHistory.length,
        clicks : result.visitHistory
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}