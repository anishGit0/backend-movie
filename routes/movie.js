const router = require('express').Router();
let Movie = require('../models/movie.model.js');

// Get all movies
router.route('/').get((req, res) => {
    Movie.find()
      .then(movies => res.json(movies))
      .catch(err => res.status(400).json({ error: 'Error fetching movies: ' + err }));
});

// Add a new movie
router.route('/add').post((req, res) => {
    const { title, director, genre, year } = req.body;
  
    if (!title || !director || !genre || !year) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const newMovie = new Movie({ title, director, genre, year });
  
    newMovie.save()
    .then(() => res.json('Movie added!'))
    .catch((err) => {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.title) {
          return res.status(400).json({ error: 'Movie with this title already exists' });
        }
        return res.status(400).json({ error: 'Error adding movie: ' + err });
    });
});

router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, director, genre, year } = req.body; // Assuming these are the fields to update// Update a movie
    try {
        // Find the movie by ID and update it
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, director, genre, year }, { new: true });

        if (!updatedMovie) {
        return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(updatedMovie); // Respond with the updated movie
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a movie
router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted.'))
    .catch(err => res.status(400).json({ error: 'Error deleting movie: ' + err }));
});


module.exports = router;
