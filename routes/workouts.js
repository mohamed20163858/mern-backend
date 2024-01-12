const express = require('express');
const Workout = require('../models/workoutModel');
const requireAuth = require("../middleware/requireAuth");

const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController');

const router = express.Router();

// check authorization

router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout 
router.get('/:id', getWorkout);

// POST a new request 
router.post('/', createWorkout);

// DELETE a single workout 
router.delete('/:id', deleteWorkout);

// UPDATE a single workout 
router.patch('/:id', updateWorkout);


module.exports = router