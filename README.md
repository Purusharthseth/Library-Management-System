# Library Management System

This project is a **Library Management System** developed using **React** (with Vite for bundling), **Express.js**, **MySQL**, and **Sequelize**. It is designed to manage books, students, and borrowing records, providing an intuitive interface for library administrators.

## Features

- **CRUD Operations**: Manage students, books, and borrowing records with full Create, Read, Update, and Delete functionalities.
- **Relational Database**: Utilizes MySQL with Sequelize as the ORM to handle complex relationships:
  - **Many-to-Many** between Students and Books.
  - **One-to-Many** between Students and Library records.
  - **One-to-Many** between Books and Library records.
- **Database Synchronization**: Automatically syncs the models with the database schema using Sequelize.

## Tech Stack

- **Frontend**:
  - React.js
  - Vite (for fast bundling)

- **Backend**:
  - Express.js
  - MySQL
  - Sequelize (ORM)

## Database Schema

The project includes the following key relationships:

- **Student and Book**: Many-to-Many relationship to track which students have borrowed which books.
- **Student and Library**: One-to-Many relationship to maintain the borrowing records of students.
- **Book and Library**: One-to-Many relationship to manage the borrowing records associated with each book.

### Example Sequelize Relationships:

```javascript
Student.belongsToMany(Book, { through: StudentBook });
Book.belongsToMany(Student, { through: StudentBook });

Student.hasMany(Library);
Library.belongsTo(Student);

Book.hasMany(Library);
Library.belongsTo(Book);
```

## Project Output

- Library Records ![Library Records](images/library-photo.png)
