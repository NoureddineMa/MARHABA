const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){

    const token = req.header('auth-token')
    if(!token) return res.status(401)
    res.json({message: "Acces Denied"})

    try {
        const verified = jwt.verify(token,
            process.env.JWT_SECRET);
            req.user = verified;
            next()
    } catch (error) {
        res.status(400)
        res.json({message: "invalid TOKEN !!"})
    }
}



