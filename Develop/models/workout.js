
const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const workoutSchema = new Schema({
    day: {
        type: Date, 
        default: () => new Date(),
    }, 
    exercises: [
        {
            type: {
                type: String, 
                trim: true, 
                required: 'Enter workout type:'
            },
            name: {
                type: String, 
                trim: true, 
                required: 'Enter the name of your exercese:'
            }, 
            duration: {
                type: Number, 
                required: 'Enter the duration of your exercise in minutes:'
            }, 
            weight: {
                type: Number, 
            }, 
            reps: {
                type: Number, 
            }, 
            sets: {
                type: Number,
            }, 
            distance: {
                type: Number,
            }, 

        },
    ],
}); 

const Workout = mongoose.model('Workout', workoutSchema); 
module.exports = Workout; 