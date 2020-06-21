const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground3',  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update({ _id: courseId}, {
    $unset: {
      'author': 'mateja'
    }
  });
  course.author.name = 'Mateja Trikic';
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  console.log(course)
  const author = await course.authors.id(authorId);
  await author.remove();
  await course.save();
}

// createCourse('Node Course', [
//   new Author({ name: 'Mateja' }),
//   new Author({ name: 'Luka' })
// ]);

// updateAuthor('5eee23902d7aaf142494f165')

addAuthor('5eee1fe950a3d53e54d11d49', new Author({ name: 'Mateja' }))

// removeAuthor('5eee1fe950a3d53e54d11d49', '5eee1f6188fe2f2cd42eb667')