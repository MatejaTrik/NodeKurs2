const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDb...', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

// Classes, objects
// Course, NodeCourse

const Course = mongoose.model('Course', courseSchema);

// Kreiramo instancu pomocu asinhrone funk 
// Zatim u promisu savuvavamo to u mongoDB
async function createCourse() {
    const course = new Course({
        name: 'Angular',
        author: 'Mateja',
        tags: ['angular', 'frontend'],
        isPublished: true,
    })
    
    // ASYNC!!!
    const result = await course.save();
    console.log(result)
}

// Izvlacimo kurseve iz DB-a 
async function getCourses() {              //filteri za find
    
    /*
    eq - equal
    ne - not equal
    gt - grater than
    gte - greater than or equal to
    lt - less than
    lte less than or equal to
    in - in
    nin - not in
    */

    // or
    // and

    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        // .find({ author: 'Mateja', isPublished: true })
        // .find({price: { $gt: 10, $lte: 20 }})
        // .find({ price: { $in: [10, 15, 20] }})
        // .find()
        // .or([ {author: 'Mateja'}, {isPublished: true} ])
        // .and([  ])
        .find({ author: /^Mateja/ }) //pocinje sa Mateja

        .find({ author: /Trikic$/i }) //zavrsava se sa Trikic

        .find({ author: /.*Mateja.*/i }) //sadrzi Mateja 
        .skip((pageNumber - 1 * pageSize))
        //koliko njih maksimalno zelimo
        .limit(pageSize)
        // po kom kriterijumu zelimo da ih prikazemo 1=rastuce  -1=opadajuce 
        .sort({ name: -1 })
        // SAMO sta zelimo da prikazemo 1-ako zelimo ako ne nista
        // .select({ name:1, tags:1 })
        //broji primerke koji zadovoljavaju kriterijum
        .count()
        console.log(courses)
}

async function updateCourse(id) {
    // 1) Update First
    // Update Directly
    // Optionally: get the updated document
    // course.set({
    //     isPublished: true,
    //     author: "Another Author",
    // })

    // 2) Query first
    // findById()
    // modify its properties
    // save()

    const course = await Course.findById(id)
    if (!course) return;

    course.isPublished = true;
    course.author = "Another Author";

    const result = await course.save();
    console.log(result)
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id })
    console.log(result)
}

removeCourse("5eeb862c3923052740f1dbbf")
