const router = require('express').Router(); 
const path = require('path'); 
const Workout = require('../models/workout'); 

//static
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html")); 
}); 

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html')); 
}); 

//db
//add
router.post('/api/workouts', (req, res) => {
    Workout.create({}).then( (dbWorkout) => {
        res.json( dbWorkout ); 
    }).catch( (err) => res.json(err)); 
}); 
router.put('/api/workouts/:id', (req, res) => {
    Workout.findByIdAndUpdate(
        req.body.params.id, 
        { $push: {exercises: body}}
    ).then( (dbWorkout) => {
        res.json(dbWorkout); 
    }).catch( (err) => res.json(err)); 
});
//delete
router.delete('/api/workouts', (req, res) => {
    Workout.findByIdAndDelete(req.body.params.id)
    .then( () => {
        res.json(true); 
    }).catch( (err) => {
        res.json(err); 
    });  
}); 
module.exports = router; 