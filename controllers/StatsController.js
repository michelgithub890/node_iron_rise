// MODEL WORKOUT 
import Workout from "../models/Workout.js"

// GET WORK OUT SUMMARY 
export const getWorkoutSummary = async (req, res) => {

    try {
        // DATA AGGREGATION TO GET A SUMMARY 
        const summary = await Workout.aggregate([

            // USER UNWIND FOR TRANSFORM EACH ELEMENT TO ARRAY SEPARATE 
            { $unwind: '$exercises' },
            {

            // GROUP DATA => DATE AND NAME EXERCISE 
            $group: {
                _id: {
                // CONVERTE DATE
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                exercise: '$exercises.name'
                },

                // SOMME REP FOR EACH EXERCISE 
                totalReps: { $sum: '$exercises.reps' },
                // SOMME WEIGHT FOR EACH EXERCISE 
                totalWeight: { $sum: '$exercises.weight' }
            }
            },
            // TRI BY DATE 
            { $sort: { '_id.date': 1 } }
        ])

        // RETURN SUMMARY 
        res.send(summary)
    } catch (error) {
        res.status(500).send(error)
    }
}

