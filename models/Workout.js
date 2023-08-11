// MONGOOSE (DATABASE)
import mongoose from "mongoose"

// SCHEMA WORKOUT 
export const WorkoutSchema = new mongoose.Schema({

  // ID CLIENT 
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // DATE 
  date: {
    type: Date, 
    default: () => {
        const date = new Date()
        date.setHours(0,0,0,0)
        return date
    }
  },
  // EXERCISES 
  exercises: [{ 
      name: String, 
      sets: Number,
      reps: Number,
      weight: Number
  }]
})

// CREATE MODEL FORM SCHEMA 
const Workout = mongoose.model('Workout', WorkoutSchema)

export default Workout

