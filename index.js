const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

// mongoose.Promise = Promise;
app.set('view engine', 'ejs');
// localhost:3000/app.txt
app.use(express.static('public'));

// insertion, deletion, updation, read

            // MongoDB
// ------------------------------------
//          studenttest Database
// -------------------------------------
//          User Collection
// user = {email: '', password: ''} --> Schema
// [user, user, {}, {}]
// --------------------------------------
//          Dog Collection
// [{}, {}, {}, {}, {}, ..................]
// ---------------------------------------
//          Cats Collection
// [{}, {}, {}, {}, .....................]

mongoose.connect('mongodb://localhost:27017/studenttest',
                 {useNewUrlParser: true, useUnifiedTopology: true}
                ).then(() => {
    console.log('Connected to mongodb');
}).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ');
    process.exit();
});

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    name: String,
    age: Number,
    dob: Date
});
const User = mongoose.model('user', UserSchema);

// app.get('/', (req, res, next) => {
//     return res.sendFile(path.join(__dirname, 'login.html'));
// });

// app.get('/home', (req, res, next) => {
//     const names = ["guru", "sanjay", "hari", "kavya"];
//     return res.render('math', { students: names });
// });

app.get('/', (req, res, next) => {
    console.log('GET method...........');
    return res.render('login');
});

app.post('/login', (req, response, next) => {
    console.log(req.body);
    let err;
    if (req.body.email !== 'guru@gmail.com') {
        err = 'User not found';
    } else if (req.body.password !== '123') {
        err = 'Wrong Password';
    }
    if (err) {
        return response.render('login', {err: err});
    }
    return response.redirect('/home');
});

app.get('/home', (req, res, next) => {
    const dogs = [
        {id: 1, name: 'Pomeranian', imageUrl: './images/pomerian.jpg'},
        {id: 2, name: 'Labrador', imageUrl: './images/labrador.jpg'},
        {id: 3, name: 'German Shepard', imageUrl: './images/german.jpeg'},
        {id: 4, name: 'Pomeranian', imageUrl: './images/pomerian.jpg'},
    ];
    return res.render('home', {dogs});
});

app.get('/dog/:id', (req, res) => {
    const dogs = [
        {id: 1, name: 'Pomeranian', imageUrl: './images/pomerian.jpg'},
        {id: 2, name: 'Labrador', imageUrl: './images/labrador.jpg'},
        {id: 3, name: 'German Shepard', imageUrl: './images/german.jpeg'},
        {id: 4, name: 'Pomeranian', imageUrl: './images/pomerian.jpg'},
    ];
    const dog = dogs[req.params.id - 1];
    return res.render('dog', {dog});
});

app.post('/user', (req, res) => {
    console.log(req.body);
    const newUser = {
        email: req.body.email,
        password: req.body.password,
    };
    // const userData = new User(newUser);
    // userData.save();
    User.insertMany([newUser]).then((data) => {
        console.log(data);
        return res.json({msg: 'success', newUser: data});
    });
});

app.get('/user', (req, res) => {
    User.findOne({email: "test@gmail.com"}).then((data) => {
        return res.json(data);
    })
});

app.patch('/user', (req, res) => {
    // name, email
    console.log(req.body);
    User.findOneAndUpdate(
        {email: req.body.email},
        {$set: {name: req.body.name}},
        {new: true}
    ).then((data) => {
        return res.json(data);
    })  
});

app.listen(3000, () => {
    console.log('Server listening in port 3000');
});
