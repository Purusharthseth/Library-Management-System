import express from 'express';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
const port = process.env.PORT || 3001;


// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);

// Models
const Student = sequelize.define('student', {
  name: Sequelize.STRING,
  class: Sequelize.STRING
});

const Book = sequelize.define('book', {
  name: Sequelize.STRING,
  author: Sequelize.STRING,
  publication: Sequelize.STRING,
  year: Sequelize.INTEGER

});

// Join Table for Students and Books
const StudentBook = sequelize.define('student_book', {
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Student,
      key: 'id'
    }
  },
  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: 'id'
    }
  }
});

// Table for Tracking Borrowing Details
const Library = sequelize.define('library', {
  startDate: Sequelize.DATE,
  endDate: Sequelize.DATE,
  studentId: {
    type: Sequelize.INTEGER,
    references: {
      model: Student,
      key: 'id'
    }
  },
  bookId: {
    type: Sequelize.INTEGER,
    references: {
      model: Book,
      key: 'id'
    }
  }
});

// Relationships
Student.belongsToMany(Book, { through: StudentBook });
Book.belongsToMany(Student, { through: StudentBook });

Student.hasMany(Library);
Library.belongsTo(Student);
Book.hasMany(Library);
Library.belongsTo(Book);

// Middleware
app.use(bodyParser.json());
app.use(cors());



// API Routes
app.post('/students', async (req, res) => {
  try {
    const student = await Student.create({
      name: req.body.name,
      class: req.body.class
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await student.update({
      name: req.body.name || student.name,
      class: req.body.class || student.class
    });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    await student.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Books routes
app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Library routes
app.post('/library', async (req, res) => {
  try {
    const library = await Library.create(req.body);
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/library', async (req, res) => {
  try {
    const library = await Library.findAll({
      include: [
        { model: Student, attributes: ['name'] },
        { model: Book, attributes: ['name'] }
      ]
    });
    res.json(library);
  } catch (error) {
    console.error('Failed to fetch library records:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching library records' });
  }
});

app.put('/library/:id', async (req, res) => {
  try {
    const library = await Library.findByPk(req.params.id);
    if (!library) {
      return res.status(404).json({ error: 'Details not found' });
    }
    await library.update(req.body);
    res.json(library);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/library/:id', async (req, res) => {
  try {
    const library = await Library.findByPk(req.params.id);
    if (!library) {
      return res.status(404).json({ error: 'Details not found' });
    }
    await library.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
