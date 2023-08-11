// controllers/routineController.js
// MODEL ROUTINE 
import Routine from '../models/Routine.js'

// ADD ROUTINES 
export const addRoutine = async (req, res) => {
    const { name, id, exercises } = req.body

    // CREATE OBJECT ROUTINE 
    const routine = new Routine({
        name,
        clientId: id,
        exercises: exercises,  
    })

    try {
        // SAVE IN DATABASE 
        await routine.save()
        res.send(routine)
    } catch (err) {
        res.status(500).send(err)
    }
}

// GET ROUTINES FROM SPECIFIC USER 
export const getRoutines = async (req, res) => {
    const { clientId } = req.query
    console.log('node js getRoutines => ', req.query)

    try {
        // FIND ALL ROUTINES OF USER 
        const routines = await Routine.find({ clientId:clientId }).populate('exercises')
        // RETURN ROUTINES 
        res.status(200).json(routines)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// DELETE ROUTINE 
export const deleteRoutine = async (req, res) => {
    console.log("deleteRoutine called with id:", req.params.id)

    try {
        // DELETE ROUTINE 
        const routine = await Routine.findByIdAndDelete(req.params.id)
        console.log('Routine found and deleted:', routine)

        // IF NOT RETURN ERROR 
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

// UPDATE ROUTINE 
export const updateRoutine = async (req, res) => {
    console.log("updateRoutine called with id:", req.params.id)

    try {
        // FIND AND UPDATE DATABASE
        const routine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true })
        console.log('Routine found and updated:', routine)

        // IF NOT RETURN ERROR 
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
