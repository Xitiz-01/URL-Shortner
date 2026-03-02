const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    shortID: {
        type : String,
        required : true,
        unique : true,
    },
    redirectURL : {
        type : String,
        required : true, 
    },
    visitedHistory : [{
        timestamp : {
            type : Number
        }
    }],
    default : [],
},
    {timestamps : true}
);

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;