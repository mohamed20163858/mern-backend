const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts 
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts);
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No workout Found!"});
    }
    const workout = await Workout.findById(id);
    if(!workout) {
        return res.status(404).json({error: "No workout Found!"});
    }
    res.status(200).json(workout);
}

// post a single workout
const createWorkout = async (req, res) => {
    const {title, reps, load} = req.body;
    const emptyFields = [];
    if(!title) {
        emptyFields.push('title');
    }
    if(!reps) {
        emptyFields.push('reps');
    }
    if(!load) {
        emptyFields.push('load');
    }
    if( emptyFields.length > 0) {
        return res.status(400).json({error: 'please fill in all fields', emptyFields})
    }
     try{
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
     } catch(error) {
        res.status(400).json({error: error.message});
     }
}

// delete a single workout 
const deleteWorkout =  async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no workout found!"});
    }
    const workout = await Workout.findByIdAndDelete({_id: id});
    if(!workout) {
        return res.status(404).json({ error: "no workout found!"});
    }
    res.status(200).json(workout);
}
// update a single workout 
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no workout found!"});
    }
    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body});
    if(!workout) {
        return res.status(404).json({ error: "no workout found!"});
    }
    res.status(200).json(workout);

}
module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}