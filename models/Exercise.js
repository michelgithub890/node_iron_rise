import mongoose from 'mongoose'

const ExerciseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    clientId: { type: String, required: true },
})

const Exercise = mongoose.model('Exercise', ExerciseSchema)

export default Exercise
