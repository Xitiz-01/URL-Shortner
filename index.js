const express = require('express');
const connectToDB = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const port = 8001;
connectToDB('mongodb://localhost:27017/url-shortener')
.then(() => console.log("Connected to DB"))
app.use(express.json());
app.use('/url', urlRoute);

app.get('/:shortId', async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID : shortId
    }, {
        $push : {
            visitHistory : {
                timestamp : Date.now()
            }
        }
    });

res.redirect(entry.redirectURL);
})
app.listen(port, () => console.log(`Server Started on port ${port}`));