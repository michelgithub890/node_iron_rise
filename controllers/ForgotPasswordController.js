// ENCODING PASSWORD 
import bcrypt from 'bcrypt'
// JSON TOKEN 
import jwt from 'jsonwebtoken'
// USER MODEL 
import User from "../models/User.js"

// SECRET KEY 
const JWT_SECRET = process.env.JWT_SECRET

// METHOD 
export const forgotPassword = async (req, res) => {
    const { token, newPassword } = req.body

    // CONTROL IF TOKEN EXIST 
    if (!token) {
        return res.status(400).send({ error: 'Token is required.' });
    }

    // CONTROL IF EMAIL EXIST 
    if (!newPassword) {
        return res.status(400).send({ error: 'New password is required.' });
    }

    // DECRIPT TOKEN 
    let userId = null
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        userId = decoded.id 
    } catch (err) {
        return res.status(400).send({ error: 'Invalid or expired token.' })
    }

    // GET USER BY ID 
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).send({ error: 'User not found.' })
    }

    // HASH NEW PASSWORD  
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)

    // SAVE NEW USER IN DATABASE 
    await user.save()

    // RETURN SUCCESSFULLY 
    res.send({ success: true, message: 'Password updated successfully.' })

}