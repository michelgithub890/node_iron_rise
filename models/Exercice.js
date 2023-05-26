import mongoose from "mongoose"

const ExerciceShema = new mongoose.Schema({
  title:String,
  clientId:String,
})

const Exercice = mongoose.model('Exercice', ExerciceShema)

export default Exercice
