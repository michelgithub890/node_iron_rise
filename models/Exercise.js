// MONGOOSE (DATABASE)
import mongoose from 'mongoose'

// SHEMA FOR EXERCISE 
const ExerciseSchema = new mongoose.Schema({
    title: { type: String, required: true }, // TITLE 
    clientId: { type: String, required: true }, // CLIENT ID 
})

// CREATE MODEL FROM SHEMA 
const Exercise = mongoose.model('Exercise', ExerciseSchema)

export default Exercise
