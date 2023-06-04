// controllers/routineController.js
import Routine from '../models/Routine.js'

export const addRoutine2 = async (req, res) => {
    const { title, id } = req.body
    console.log('addRoutine => ', req.user._id)

    const routine = new Routine({
        title,
        clientId:id,
    })

    try {
        await routine.save()
        res.send(routine)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const addRoutine = async (req, res) => {
    const { name, id, exercises } = req.body
    const routine = new Routine({
        name,
        clientId: id,
        exercises: exercises,  
    })
    try {
        await routine.save()
        res.send(routine)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const getRoutines = async (req, res) => {
    const { clientId } = req.query
    console.log('node js getRoutines => ', req.query)
    try {
        const routines = await Routine.find({ clientId:clientId }).populate('exercises')
        res.status(200).json(routines)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const deleteRoutine = async (req, res) => {
    console.log("deleteRoutine called with id:", req.params.id)
    try {
        const routine = await Routine.findByIdAndDelete(req.params.id)
        console.log('Routine found and deleted:', routine)

        if (!routine) {
            res.status(404).json({ message: 'Routine not found' })
            return
        }

        console.log('Routine successfully removed')
        res.json({ message: 'Routine removed' })
    } catch (err) {
        console.error("Error in deleteRoutine:", err)
        res.status(500).json({ message: err.message })
    }
}

export const updateRoutine = async (req, res) => {
    console.log("updateRoutine called with id:", req.params.id)
    try {
        const routine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log('Routine found and updated:', routine)

        if (!routine) {
            res.status(404).json({ message: 'Routine not found' })
            return
        }

        console.log('Routine successfully updated')
        res.json({ message: 'Routine updated', routine: routine })
    } catch (err) {
        console.error("Error in updateRoutine:", err)
        res.status(500).json({ message: err.message })
    }
}
