const jwt = require('jsonwebtoken')
const db  = require('../config/db.js');

exports.getAuthorizationUser = function(req, res) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
    res.send(decoded)
};

exports.getUserByName = function(req, res,next) {  
if(req.params.username!="login" && req.params.username!="logout"){
db.User.findOne({
    where: {username: req.params.username}
}).then(user => {
    if(user){
        res.send(user,200) 
    }else{
        res.send("User not found",404)
    }     
}).catch(err=>res.send("Invalid user supplied",400))}else{next()}

};

exports.updateUser = function(req, res) {
    db.User.findOne({ where: { username: req.params.username} })
    .then(user => {   
    if (user) {
        user.update({
        username: req.params.username,
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        email: req.params.email,
        password: req.params.password,
        phone: req.params.phone,
        userStatus:req.params.userStatus
      })
      .then(function () {})
      .catch(err=>res.send("User not found",404))
    }
  }).catch(err=>res.send("Invalid user supplied",400))
};

exports.createUser = function(req, res) {
    db.User.create({
        username: req.params.username,
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        email: req.params.email,
        password: req.params.password,
        phone: req.params.phone,
        userStatus:req.params.userStatus
    }).then(res => {
        res.send("successful operation",200) 
    }).catch(err=>res.send("Invalid user supplied",400));
};

exports.deleteUser = function(req, res) {
    db.User.destroy({
        where: {username: req.params.username}
    }).then(user => {
        res.send("successful operation",200)   
    }).catch(err=>res.send("User not found",404))   
};

exports.createWithArray = function(req, res) {
    db.User.bulkCreate({
        username: req.params.username,
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        email: req.params.email,
        password: req.params.password,
        phone: req.params.phone,
        userStatus:req.params.userStatus
    }).then(res => {
        res.send("successful operation",200) 
    }).catch(err=>res.send("Invalid user supplied",400));
};

exports.createWithList = function(req, res) {
    db.User.bulkCreate({
        username: req.params.username,
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        email: req.params.email,
        password: req.params.password,
        phone: req.params.phone,
        userStatus:req.params.userStatus
    }).then(res => {
        res.send("successful operation",200) 
    }).catch(err=>res.send("Invalid user supplied",400));
};

exports.getLogsUser = function(req, res) {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const uservalidation = new User();

    db.User.findOne({
        where: {
            username: username,
            password: password
        }
    }).then(user => {
        if(user){   
           
            let payload = {username: username}
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            var data = 
            {
            "Bearer-Token": accessToken,
            "X-Expires-After": process.env.ACCESS_TOKEN_LIFE,
            "X-Rate-Limit":"NOT IMPLEMENTED"    
            };
            res.cookie("access_token", accessToken, { maxAge: process.env.ACCESS_TOKEN_LIFE })
            res.json(data)
        }else{
            res.send("Invalid user supplied",400)
        }     
    }).catch(err=>res.send("Invalid user supplied",400));

    
};

exports.getLogsOutUser = function(req, res) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    res.cookie("access_token", token, {
        expires: new Date(0),
        path: "/"
      });
    res.sendStatus(200).send("Logout successful")
   };
   
