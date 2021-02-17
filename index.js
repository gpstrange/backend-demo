const express = require('express');
const path = require('path');
const app = express();
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true }));

// mongoose.Promise = Promise;
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/studenttest', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ');
    process.exit();
});

app.get('/', (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'login.html'));
});

// app.get('/home', (req, res, next) => {
//     const names = ["guru", "sanjay", "hari", "kavya"];
//     return res.render('math', { students: names });
// });

app.get('/login', (req, res, next) => {
    return res.render('login');
});

app.listen(3000, () => {
    console.log('Server listening in port 3000');
});
