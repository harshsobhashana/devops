const express = require('express');
const cors = require('cors');
const app = express();

// Utility functions
function findIndex(arr, id) {
  return arr.findIndex(item => item.id === id);
}

function deleteItemIndex(arr, id) {
  return arr.filter(item => item.id !== id);
}

// Middlewares
app.use(express.json()); // Replaces bodyParser.json()
app.use(cors({
  origin: ["https://mern-todo-mayank.vercel.app"],
}));

let todo = [];
let counter = 1;

// Routes
app.get('/todos', (req, res) => {
  res.status(200).send(todo);
});

app.get('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).send('Todo item not found.');
  }
  res.json(todo[todoIndex]);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: counter++,
    title: req.body.title,
    description: req.body.description,
  };
  todo.push(newTodo);
  res.status(201).send(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todo = deleteItemIndex(todo, id);
  res.status(200).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todo, parseInt(req.params.id));
  if (todoIndex === -1) {
    return res.status(404).send('Todo item not found.');
  }
  // Update fields if they exist in the request body
  if (req.body.title) {
    todo[todoIndex].title = req.body.title;
  }
  if (req.body.description) {
    todo[todoIndex].description = req.body.description;
  }
  res.status(200).json(todo[todoIndex]); // Send updated todo item
});

// Default route for API
app.get('/', (req, res) => {
  res.status(200).send('API is working');
});

app.use('*', (req, res) => {
  res.status(404).send('Route not defined.');
});

// Start the server
app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});

module.exports = app;
