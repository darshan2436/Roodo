// backend/routes/todo.js
const express = require('express');
const Todo = require('../models/Todo'); // Make sure to create the Todo model
const router = express.Router();

// Add new Todo
router.post('/', async (req, res) => {
  const { title, deadline,  added, completedAt, punishment ,isCompleted } = req.body;

  try {
    const newTodo = new Todo({
      title,
      deadline,
      added,
      completedAt,
      punishment,
      isCompleted: false,
      // email,
    });

    await newTodo.save();
    res.status(201).json({ msg: 'Todo added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; // Correct parameter extraction
  const { punishment } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: { punishment } },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error('Error updating todo:', err);
    res.status(500).json({ message: 'Failed to update todo' });
  }
});



module.exports = router;