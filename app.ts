import express, { Application } from 'express';
import * as bodyParser from 'body-parser';

import homeRoute from './routes/homeRoute';
import booksRoute from './routes/booksRoute';
import publishersRoute from './routes/publishersRoute';
import commentsRoute from './routes/commentsRoute';
import notFoundRoute from './routes/404Route';

import { sequelize } from './db';
import { Book } from './Models/Book';
import { Comment } from './Models/Comment';
import { Publisher } from './Models/Publisher';

const app: Application = express();
const port: number = 3000;

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});
  
Book.hasMany(Comment, {
  foreignKey: 'book_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Book, {
  foreignKey: 'book_id',
});

Publisher.hasMany(Book, {
  foreignKey: {
    name: 'publisher_id',
    allowNull: false
  },
  onDelete: 'RESTRICT'
});

Book.belongsTo(Publisher, {
  foreignKey: 'publisher_id',
});

sequelize.sync().then(() => {
    console.log("synced successfully");
  }).catch((err) => {
    console.error(err)
});

app.use(bodyParser.json());
app.set('view engine', 'pug');

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/', homeRoute);
app.use('/books', booksRoute);
app.use('/publishers', publishersRoute);
app.use('/comments', commentsRoute);
app.use(notFoundRoute);
