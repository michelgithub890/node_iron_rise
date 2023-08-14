// NODEMAILER 
import nodemailer from 'nodemailer'
// DOTENV 
import dotenv from 'dotenv'
// UUID 
import { v4 as uuidv4 } from 'uuid'
// EXPRESS RATE LIMIT 
import rateLimit from 'express-rate-limit'
// USER MODEL 
import User from '../models/User.js'
// DOT ENV CONFIG 
dotenv.config()

// Middleware pour limiter le taux // MIDDLEWARE FOR LIMIT TIME AND NUMBER ASK
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 demandes toutes les 15 minutes
  message: "Trop de tentatives de réinitialisation de mot de passe. Réessayez plus tard."
})

// METHOD SEND EMAIL 
export const sendEmail = async (req, res) => {
    console.log("sendEmail called with email:", req.params.email)

    // TRANSPORTER NODEMAILER 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.KEY_EMAIL,
            pass: process.env.KEY_GMAIL 
        }
    })

    // Générez un token unique // CREATE UNIQUE KEY 
    const resetToken = uuidv4()

    // FIND USER BY EMAIL 
    // const user = await User.findOne({ email: "michel@gmail.com" })
    const user = await User.findOne({ email: req.params.email })
    console.log("sendEmail user ", user)
    if (!user) {
        return res.status(400).json({ msg: 'Invalid email' })
    }
    
    // PUT EXPIRES IN USER DATABASE 
    user.passwordResetToken = resetToken
    user.passwordResetExpires = Date.now() + 15*60*1000 // Le token expire dans 15 minutes
    await user.save()

    // MAIL OPTIONS 
    const mailOptions = {
        from: 'laurentmichelst@gmail.com',
        to: req.params.email,
        subject: 'Réinitialisez votre mot de passe',
        text: `
            Bonjour,\n\n
            Cliquez sur ce lien pour réinitialiser votre mot de passe.\n\n
            https://applysolution-mobile.web.app/authPassword/${req.params.email}\n\n
            Si vous n'avez pas demandé à réinitialiser votre mot de passe, vous pouvez ignorer cet e-mail.\n\n
            Merci\n\n
            Votre équipe, Iron rise`
    }

    try {
        // TRY TO SEND EMAIL 
        const info = await transporter.sendMail(mailOptions)
        console.log('Email sent: ' + info.response)
        res.send({
            status: 'success',
            message: 'Email sent successfully',
            to: req.params.email
        })
    } catch (error) {
        console.error('Error sending email:', error)
        res.status(500).send({
            status: 'failure',
            message: 'Error sending email',
            error: error.message
        })
    }
}
