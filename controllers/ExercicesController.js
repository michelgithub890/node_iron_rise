// controllers/routineController.js
import Exercice from '../models/Exercice.js'

export const addExercice = async (req, res) => {
    console.log('addExercice => ')
    const { title } = req.body
    const clientId = req.user._id // Assume user id is in JWT payload

    const exercice = new Exercice({
        title,
        clientId,
    })

    try {
        await exercice.save()
        res.send(exercice)
    } catch (err) {
        res.status(500).send(err)
    }
}
