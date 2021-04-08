const express = require('express');
const bodyParser = require('body-parser');

const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize:10000000
    }
});

const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({
    extended: false
}));

//parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//----------------------------------------------------------------------


//Create a scheme for People
const PeopleSchema = new mongoose.Schema({
    Person: String,
    Description: String,
    Owns: String,
});

//Create a model for people
const People = mongoose.model('People', PeopleSchema);

//Upload Photo

app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        Owns: "/images/" + req.file.filename
    });
});

//Create a Person
app.post('/api/peoples', async (req, res) => {
    const people = new People({
        Person: req.body.Person,
        Description: req.body.Description,
        Owns: req.body.Owns,
    });
    try {
        await people.save();
        res.send(people);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//List of all People

app.get('/api/peoples', async (req, res) => {
    try {
        let peoples = await People.find();
        res.send(peoples);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})


//------------------------------------------------------------------------

//Schema for Car

const carSchema = new mongoose.Schema({
    people: {
        type: mongoose.Schema.ObjectId,
        ref: 'People'
    },

    make: String,
    model: String,
    color: String,
    year: String,
    path: String,
})

//Model for Car
const Car = mongoose.model('Car', carSchema);

//Upload Car Photo

app.post('/api/photos', upload.single('carPhoto'), async (req, res) => {
    // Safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

//Create Car

app.post('/api/peoples/:peopleID/cars', async (req, res) => {
    try {
        let people = await People.findOne({_id: req.params.peopleID});
        if (!people) {
            res.sendStatus(404);
            return;
        }
        let car = new Car({
            people: people,
            make: req.body.make,
            model: req.body.model,
            color: req.body.color,
            year: req.body.year,
            path: req.body.path,
        });
        await car.save();
        res.send(car);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/peoples/:peopleID/cars/:carID', async (req, res) => {
    try {
        let car = await Car.findOne({_id:req.params.carID, people: req.params.peopleID});
        if (!car) {
            res.sendStatus(404);
            return;
        }
        let cars = await Car.find({people:people});
        res.send(cars);
    }   catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/peoples/:peopleID/cars/:carID', async (req, res) => {
    try {
        let car = await Car.findOne({_id:req.params.carID, people: req.params.peopleID});
        if (!car) {
            res.sendStatus(404);
            return;
        }
        car.make = req.body.make;
        car.model = req.body.model;
        car.color = req.body.color;
        car.year = req.body.year;
        car.path = req.body.path;
        await car.save();
        res.send(car);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/peoples/:peopleID', async(req, res) => {
    try {
        let person = await People.findOne({_id:req.params.peopleID})
        if (!person) {
            res.sendStatus(404);
            return;
        }
        let per = await People.findOne({_id: req.params.peopleID});
        res.send(per);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
});

//-----------------------------------------------------------------------
app.listen(3000, () => console.log('Server listening on port 3000!'));