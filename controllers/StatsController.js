import Workout from "../models/Workout.js"

export const getWorkoutSummary = async (req, res) => {
    try {
        const summary = await Workout.aggregate([
            { $unwind: '$exercises' },
            {
            $group: {
                _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                exercise: '$exercises.name'
                },
                totalReps: { $sum: '$exercises.reps' },
                totalWeight: { $sum: '$exercises.weight' }
            }
            },
            { $sort: { '_id.date': 1 } }
        ])
        res.send(summary)
    } catch (error) {
        res.status(500).send(error)
    }
}
