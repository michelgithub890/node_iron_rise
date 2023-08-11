// MODEL EXERCISE 
import Exercise from "../models/Exercise.js"

// ADD EXERCISE 
export const addExercise = async (req, res) => {
    const { title, id } = req.body

    // CREATE NEW OBJECT 
    const exercise = new Exercise({
        title,
        clientId:id,
    })

    try {
        // SAVE IN DATABASE 
        await exercise.save()
        res.send(exercise)
    } catch (err) {
        res.status(500).send(err)
    }
}

// GET LIST EXERCISES FROM SPECIFIC USER 
export const getExercises = async (req, res) => {
    const { clientId } = req.query

    try {
        // FIND ALL EXERCISES FROM USER 
        const exercises = await Exercise.find({ clientId:clientId })
        res.status(200).json(exercises)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


// UPDATE EXERCISE 
export const updateExercise = async (req, res) => {
    const { id } = req.params 
    const { title } = req.body 

    try {
        // UPDATE EXERCISE (DATABASE) => NEW TRUE => REFRESH EXERCISE 
        const updateExercise = await Exercise.findByIdAndUpdate(id, { title }, { new:true })
        res.json(updateExercise)
    } catch (error) {
        res.status(404).json({ message: error.message }) 
    }
}

// DELETE EXERCISE 
export const deleteExercise = async (req, res) => {
    const { id } = req.params
    try {

        // FIND AND DELETE 
        const exercise = await Exercise.findByIdAndDelete(id)

        // IF NO EXERCISE RETURN ERROR
        if (!exercise) {
            res.status(404).json({ message: 'exercice not found' })
            return
        }
        res.json({ message: 'exercice removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

