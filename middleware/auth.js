// middleware/auth.js

import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    console.log('auth method ')
    const authHeader = req.headers['authorization']

    if (!authHeader) {
        return res.status(401).json({message: 'Access Denied'})
    }

    const token = authHeader.split(' ')[1] // split the Bearer <token> to extract the token
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).json({message: 'Invalid Token'})
    }
}

export default auth
