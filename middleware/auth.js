// middleware/auth.js
// IMPORT JSON WEB TOKEN 
import jwt from 'jsonwebtoken'

// MIDDLEWARE FOR VERIFY TOKEN OF REQUEST 
const auth = (req, res, next) => {
    console.log('auth method ')
    // GET TOKEN FROM HEADER 
    const authHeader = req.headers['authorization']

    // IF NO TOKEN RETURN ERROR 
    if (!authHeader) {
        return res.status(401).json({message: 'Access Denied'})
    }

    // GET TOKEN 
    const token = authHeader.split(' ')[1] // split the Bearer <token> to extract the token
    
    try {
        // VERIFY VALIDITIE TOKEN 
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // PUT VERIFIED IN REQUEST 
        req.user = verified
        next()

    } catch (err) {
        // ERROR 
        res.status(400).json({message: 'Invalid Token'})
    }
}

export default auth
