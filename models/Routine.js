// models/Routine.js
import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const RoutineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [{ type: ObjectId, ref: 'Exercise' }], 
  clientId: { type: String, required: true },
})

const Routine = mongoose.model('Routine', RoutineSchema)

export default Routine

  