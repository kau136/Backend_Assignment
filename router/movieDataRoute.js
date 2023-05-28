const express = require('express')
const router = express.Router();
const empController = require('../controller/movieData');

router.get('/api/v1/longest-duration-movies', empController.getAllData);
router.post('/api/v1/new-movie', empController.postMovieData);
router.get('/api/v1/top-rated-movies', empController.getMovieData);
router.get('/api/v1/genre-movies-with-subtotals', empController.genresMovieData);
router.post('/api/v1/update-runtime-minutes', empController.updateMovieData);


module.exports = router;
