// MONGOOSE (DATABASE)
import mongoose from 'mongoose'

// GET OBJECT ID FROM MANGOOSE 
const { ObjectId } = mongoose.Schema.Types

// SCHEMA ROUTINE 
const RoutineSchema = new mongoose.Schema({
  // NAME 
  name: { type: String, required: true },  
  // LIST EXERCISE ASSOCIATE WITH ROUTINE 
  exercises: [{ type: ObjectId, ref: 'Exercise' }],  
  // ID CLIENT ASSOCIATE TO ROUTINE 
  clientId: { type: String, required: true },
})

// CREATE MODEL FORM SCHEMA  
const Routine = mongoose.model('Routine', RoutineSchema)

export default Routine

  