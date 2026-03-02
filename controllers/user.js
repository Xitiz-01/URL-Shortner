const{v4 : uuidv4} = require('uuid');
const User = require('../models/users');
const{setUser} = require('../service/auth');
async function handleUserSignup(req, res) {
    const {name , email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");

}
async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) 
        return res.render('login',{
            error : "Invalid Credentials"
        });
        const sessionID = uuidv4();
        setUser(sessionID, user);
        res.cookie('uid', sessionID);
    return res.redirect("/");

}
    module.exports = {
        handleUserSignup,
        handleUserLogin
};