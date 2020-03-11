const jwt = require('jsonwebtoken');
const coreCtrl = {};

coreCtrl.verifyToken = async (req, res, next) => {
    try {
        if (!req.headers['x-access-token']) {
            return res.status(401).json({
                auth: false,
                message:'Unauhtorized Request'})
        }

        /* por convencion los token llevan la palabra 'Bearer '
        con esto se optiene el token solamente */
        const token = req.headers['x-access-token'].split(' '/* < Need 2 spaces */)[1];
        // const token = req.headers['x-access-token'];
        // console.log(" * Token: "+token)

        if (token === 'null') {
            return res.status(401).json({
                auth: false,
                message:'Unauhtorized Request'})
        }

        const payload = await jwt.verify(token, process.env.SECRET_KEY);

        if (!payload) {
            return res.status(401).json({
                auth: false,
                message:'Unauhtorized Request'})
        }

        req.userId = payload._id;
        req.auth = true
        next();
        
    } catch(e){
        //console.log(e)
		return res.status(401).json({
            auth: false,
            message: e.message})
    }
}

module.exports = coreCtrl;