const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/studenttest', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Connected to mongo');
}).catch((err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ');
    process.exit();
});

app.get('/', (req, res, next) => {
    return res.json({status: "Hey there"});
});

app.listen(3000, () => {
    console.log('Server listening in port 3000');
});