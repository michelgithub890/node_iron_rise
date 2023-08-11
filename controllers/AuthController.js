// AuthController.js
// MODEL USER 
import User from "../models/User.js"
// CRYPT PASSWORD 
import bcrypt from 'bcrypt'
// TOKEN 
import jwt from 'jsonwebtoken'
// KEY HIDEN
import dotenv from 'dotenv'

// GET VARIABLES FROM .ENV
dotenv.config()

// CONTROL NEW USER 
export const register = async (req, res) => {
    console.log("node js register ", )
    // GET CONST FROM REQUEST 
    const { fname, lname, email, password } = req.body

    try {
        // IS USER EXIST 
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // CREATE NEW USER 
        user = new User({
            fname,
            lname,
            email,
            password
        });

        // SALER AND HASHER PASSWORD SECURITY 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // SAVE USER 
        await user.save();
        const payload = {
            user: {
                id: user.id
            }
        };

        // CREATE TOKEN 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ status: 'ok', token, _id:user.id, fname:user.fname, lname:user.lname })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}


// CONTROL USER CONNECT 
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        // FIND USER BY EMAIL 
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // VERIFY PASSWORD OK 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const payload = {
            user: {
                id: user.id
            }
        };

        // CREATE TOKEN 
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            // { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ status: 'ok', token, _id:user.id, fname:user.fname, lname:user.lname })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// GET DATA FROM TOKEN 
export const getUserData = async (req, res) => {
    console.log('getUserData node js')
    const { token } = req.body

    // Decode token
    try {

        // DECODE TOKEN => GET ID USER 
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // FIND ID BY ID (no password)
        const user = await User.findById(decoded.user.id).select('-password')
        if (!user) {
            return res.status(400).json({ msg: 'User not found' })
        }

        // RETURN DATA USER 
        res.json(user)
    } catch (e) {
        console.error('Something went wrong with the token', e)
        return res.status(500).json({ msg: 'Server error' })
    }
}
