const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){

    if (!req.headers.authorization) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    var authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")){
        var token = authHeader.substring(7, authHeader.length);
   } else {
      return res.status(403).json({ message: 'Authorization Bearer  undefined' });
   }

    try
    { 
        let payload
        payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){  
        res.status(403).json({error : e});
    }
    
}

