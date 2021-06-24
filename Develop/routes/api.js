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
router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },
    ]).then( (dbWorkout) => {
        res.json(dbWorkout); 
    }).catch( (err) => res.json(err)); 
}); 
router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
        $addFields: {
            totalDuration: {
                $sum: '$exercises.duration',
            },
        }
    }]).sort({_id: -1}).limit(7).then( (dbWorkouts) => {
        console.log(dbWorkouts); 
        res.json(dbWorkouts); 
    }).catch( (err) => {
        res.json(err); 
    }); 
}); 
router.post('/api/workouts', (req, res) => {
    Workout.create({}).then( (dbWorkout) => {
        res.json( dbWorkout ); 
    }).catch( (err) => res.json(err)); 
}); 
router.put('/api/workouts/:id', ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        params.id, 
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