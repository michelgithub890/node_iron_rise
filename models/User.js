// MONGOOSE (DATABASE)
import mongoose from "mongoose"

const UserShema = new mongoose.Schema({
  // FIRST NAME - LAST NAME - EMAIL - PASSWORD 
  fname:String,
  lname:String,
  email:String,
  password:String,
})

// CREATE MODEL FORM SCHEMA 
const User = mongoose.model('User', UserShema)

export default User
