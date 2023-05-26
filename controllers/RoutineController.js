// controllers/routineController.js
import Routine from '../models/Routine.js'

export const addRoutine = async (req, res) => {
    const { title, exercises } = req.body
    const clientId = req.user._id // Assume user id is in JWT payload

    const routine = new Routine({
        title,
        exercises,
        clientId,
    })

    try {
        await routine.save()
        res.send(routine)
    } catch (err) {
        res.status(500).send(err)
    }
}
