// IMPORT EXPRESS 
import express from "express"
// EMAIL CONTROLLER 
import { limiter, sendEmail } from "../controllers/EmailController.js"
// FORGOT EMAIL CONTROLLER 
import { forgotPassword } from "../controllers/ForgotPasswordController.js"
// INITIALISE ROUTEUR 
const router = express.Router()

// MIDDLEWARE 
router.use(limiter)

// ASSOCIATE ROUTE AND FUNCTION 
router.get('/email/:email', sendEmail)
router.post('/forgotPassword', forgotPassword)

export default router