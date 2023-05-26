import mongoose from "mongoose"

const RoutineShema = new mongoose.Schema({
  title:String,
  exercices:[String],
  clientId:String,
})

const Routine = mongoose.model('Routine', RoutineShema)

export default Routine
