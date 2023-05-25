import mongoose from "mongoose"

const UserShema = new mongoose.Schema({
  fname:String,
  lname:String,
  email:String,
  password:String,
})

const User = mongoose.model('User', UserShema)

export default User
