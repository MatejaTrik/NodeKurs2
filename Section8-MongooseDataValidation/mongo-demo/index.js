const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDb...', err))

const courseSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
     },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'netvork'],
        lowercase: true,
        //uppercase: true,
        trim: true,
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    // do some async work than call callback
                    const result = v && v.length > 0;
                    callback(result)
                }, 4000)
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished; },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
});

// Classes, objects
// Course, NodeCourse

const Course = mongoose.model('Course', courseSchema);

// Kreiramo instancu pomocu asinhrone funk 
// Zatim u promisu savuvavamo to u mongoDB
async function createCourse() {
    const course = new Course({
        name: 'Angular',
        category: 'Web',
        author: 'Mateja',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8,
    })
    try{
        // ASYNC!!!
        const result = await course.save();
        console.log(result)
        
    } catch(ex) {
        for(field in ex.errors)
            console.log(ex.errors[field].message);
    }
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
        // .find({ author: /^Mateja/ }) //pocinje sa Mateja

        // .find({ author: /Trikic$/i }) //zavrsava se sa Trikic

        // .find({ author: /.*Mateja.*/i }) //sadrzi Mateja 

        .find({ _id: '5eecc1078a178f1bd0789288' })

        // .skip((pageNumber - 1 * pageSize))
        //koliko njih maksimalno zelimo
        // .limit(pageSize)
        // po kom kriterijumu zelimo da ih prikazemo 1=rastuce  -1=opadajuce 
        // .sort({ name: -1 })
        // SAMO sta zelimo da prikazemo 1-ako zelimo ako ne nista
        // .select({ name:1, tags:1 })
        //broji primerke koji zadovoljavaju kriterijum
        // .count()
        console.log(courses[0].price)
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

getCourses()
