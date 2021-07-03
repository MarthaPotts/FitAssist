const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
//logs responses to the console
const morgan = require('morgan'); 


const app = express(); 
const routes = require('./routes/api.js'); 
const PORT = 3000; 

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(routes); 
app.use(morgan('dev'));  

mongoose.connect('mongodb://localhost/workout', {
    useNewUrlParser: true, 
    useFindAndModify: true, 
    useUnifiedTopology: true,
}); 
const db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error')); 

app.listen (PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`); 
});