const Joi = require('joi')
const express = require('express');
const app = express()

app.use(express.json())

app.use(function(req, res, next) {
    console.log("loggind...")
    next()
})

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World!!!')
});

app.get('/api/courses', (req, res) => {
    res.send(courses)
});

app.post('/api/courses', (req,res) => {
    const sema = {
        name: Joi.string().min(3).required()
    }
    
    const result = Joi.validate(req.body, sema); 
    if (result.error) {
        //404 bad request
        res.status(404).send(result.error);
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course)
})

// 
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Current id was not found') //404 
    res.send(course)
})

// PORT
// const port = process.env.PORT || 3000;
let port = 3000;
app.listen(port, () => console.log(`Listenning on port ${port}...`))