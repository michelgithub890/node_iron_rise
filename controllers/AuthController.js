// AuthController.js
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const register = async (req, res) => {
    console.log("node js register ", )
    const { fname, lname, email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            fname,
            lname,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ status: 'ok', token })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ status: 'ok', token })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

export const getUserData = async (req, res) => {
    console.log('getUserData node js')
    const { token } = req.body
    // Decode token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.user.id).select('-password')
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }
        res.json(user)
    } catch (e) {
        console.error('Something went wrong with the token', e)
        return res.status(500).json({ msg: 'Server error' })
    }
}
