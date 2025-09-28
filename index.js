const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let notes = [];
let nextId = 1;

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// GET one note by id
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  res.json(note);
});

// POST create new note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: nextId++, title, content };
  notes.push(newNote);
  res.status(201).json(newNote);
});

// PATCH update note
app.patch('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }
  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;
  res.json(note);
});

// DELETE note
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Note not found" });
  }
  const deleted = notes.splice(index, 1);
  res.json({ message: "Deleted successfully", note: deleted[0] });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});