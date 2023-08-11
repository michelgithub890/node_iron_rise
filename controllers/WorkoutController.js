// MODE WORKOUT 
import Workout from "../models/Workout.js"

// ADD WORKOUT 
export const addWorkout = async (req, res) => {
    const { clientId, title } = req.body

    // créer la date du jour à minuit // CREATE DATE START MIDNINGT 
    const today = new Date()
    today.setHours(0,0,0,0)

    try {
        // vérifier si un workout existe déjà pour le client aujourd'hui
        // FIND IF WORKOUT EXIST AT THIS DATE 
        let workout = await Workout.findOne({ clientId: clientId, date: today })

        // si aucun workout n'existe, en créer un nouveau
        // IF NOT CREATE NEW WORKOUT 
        if (!workout) {
            workout = new Workout({ clientId:clientId, title: title })
            await workout.save()
        }

        res.status(201).json(workout)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// GET ALL WORKOUTS 
export const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.find()
        res.status(200).json(workout)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// GET TODAY WORKOUT 
export const getWorkoutToday = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);  // set the time to 00:00:00
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);  // set to the same time tomorrow

        // Find workouts that have a date of today
        const workout = await Workout.find({ date: { $gte: today, $lt: tomorrow } });
        
        res.status(200).json(workout);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}


// UPDATE WORKOUT 
export const updateWorkout = async (req, res) => {
    const { clientId } = req.params
    const { exercise } = req.body

    // Obtenir la date du jour
    // GET DATE 
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Ajouter l'exercice au workout de l'utilisateur pour aujourd'hui
    // ADD WORKOUT WITH ID USER 
    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { clientId: clientId, date: { $gte: today } },
            { $push: { exercises: exercise } },
            { new: true, useFindAndModify: false }
        );
        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// UPDATE WORKOUT 
export const updateExerciseInWorkout = async (req, res) => {
    const { } = req.params
    const { exerciseId, exercise, clientId } = req.body

    // Obtenir la date du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    try {
        // Rechercher l'entraînement du jour pour le client spécifié
        // FIND WORKOUT 
        const workout = await Workout.findOne({ clientId: clientId, date: { $gte: today } });

        // IF NOT RETURN ERROR 
        if (!workout) {
            res.status(404).json({ message: 'Aucun entraînement trouvé pour le client et la date spécifiés.' });
            return;
        }

        // Trouver l'index de l'exercice à modifier
        // FIND AND UPDATE 
        const index = workout.exercises.findIndex(e => e._id.toString() === exerciseId);
        if (index === -1) {
            res.status(404).json({ message: 'Aucun exercice trouvé avec l\'id spécifié.' });
            return;
        }

        // Remplacer l'exercice à cet index
        // REPLACE EXERCISE 
        workout.exercises[index] = exercise;

        // Sauvegarder l'entraînement modifié
        // SAVE DATA 
        const updatedWorkout = await workout.save();

        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


// DELETE WORKOUT WITH ID
export const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No workout with id: ${id}`)
    await Workout.findByIdAndRemove(id)
    res.json({ message: "Workout deleted successfully." })
}
