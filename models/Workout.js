import mongoose from "mongoose"

export const WorkoutSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: {
    type: Date, 
    default: () => {
        const date = new Date()
        date.setHours(0,0,0,0)
        return date
    }
  },
  exercises: [{ 
      name: String, 
      sets: Number,
      reps: Number,
      weight: Number
  }]
})

const Workout = mongoose.model('Workout', WorkoutSchema)

export default Workout

