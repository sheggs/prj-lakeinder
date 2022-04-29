const KEY = "$2lC7Mn`46+giA:BW[KYr<XQ]}KeuC"

const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    if(req.header('Authorization')){
        const token = req.header('Authorization').replace('Bearer ', '')
        let data = ""
        try{
            data = jwt.verify(token, KEY)
            req.user = jwt.decode(req.headers.authorization, KEY)
            next()
        }catch(e){
            res.status(401).send({ message: 'Not authorized to access this resource' })
            return
        }
    }else{
        res.status(401).send({ message: 'Not authorized to access this resource' })
        return
    }


}
module.exports = auth