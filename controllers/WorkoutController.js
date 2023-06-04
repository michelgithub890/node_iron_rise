import Workout from "../models/Workout.js"

export const addWorkout = async (req, res) => {
    const { clientId, title } = req.body

    // créer la date du jour à minuit
    const today = new Date()
    today.setHours(0,0,0,0)
    try {
        // vérifier si un workout existe déjà pour le client aujourd'hui
        let workout = await Workout.findOne({ clientId: clientId, date: today })

        // si aucun workout n'existe, en créer un nouveau
        if (!workout) {
            workout = new Workout({ clientId:clientId, title: title })
            await workout.save()
        }

        res.status(201).json(workout)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}


export const getWorkout = async (req, res) => {
    try {
        const workout = await Workout.find()
        res.status(200).json(workout)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

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


export const updateWorkout = async (req, res) => {
    const { clientId } = req.params
    const { exercise } = req.body

    // Obtenir la date du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Ajouter l'exercice au workout de l'utilisateur pour aujourd'hui
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

export const updateExerciseInWorkout = async (req, res) => {
    const { } = req.params
    const { exerciseId, exercise, clientId } = req.body

    // Obtenir la date du jour
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    console.log('updateExerciseInWorkout ====================>', clientId, exerciseId, exercise)

    try {
        // Rechercher l'entraînement du jour pour le client spécifié
        const workout = await Workout.findOne({ clientId: clientId, date: { $gte: today } });

        if (!workout) {
            res.status(404).json({ message: 'Aucun entraînement trouvé pour le client et la date spécifiés.' });
            return;
        }

        // Trouver l'index de l'exercice à modifier
        const index = workout.exercises.findIndex(e => e._id.toString() === exerciseId);
        if (index === -1) {
            res.status(404).json({ message: 'Aucun exercice trouvé avec l\'id spécifié.' });
            return;
        }

        // Remplacer l'exercice à cet index
        workout.exercises[index] = exercise;

        // Sauvegarder l'entraînement modifié
        const updatedWorkout = await workout.save();

        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


export const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No workout with id: ${id}`)
    await Workout.findByIdAndRemove(id)
    res.json({ message: "Workout deleted successfully." })
}
