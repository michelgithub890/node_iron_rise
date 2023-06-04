import Exercise from "../models/Exercise.js"

export const addExercise = async (req, res) => {
    const { title, id } = req.body
    const exercise = new Exercise({
        title,
        clientId:id,
    })
    try {
        await exercise.save()
        res.send(exercise)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getExercises = async (req, res) => {
    const { clientId } = req.query
    try {
        const exercises = await Exercise.find({ clientId:clientId })
        res.status(200).json(exercises)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const updateExercise = async (req, res) => {
    const { id } = req.params 
    const { title } = req.body 
    try {
        const updateExercise = await Exercise.findByIdAndUpdate(id, { title }, { new:true })
        res.json(updateExercise)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteExercise = async (req, res) => {
    const { id } = req.params
    try {
        const exercise = await Exercise.findByIdAndDelete(id)

        if (!exercise) {
            res.status(404).json({ message: 'exercice not found' })
            return
        }
        res.json({ message: 'exercice removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

