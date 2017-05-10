const express = require('express');
const router = express.Router();
//connection to the database
const knex = require('../db/knex')

/* /movies endpoint mounted in app.js */
//READ all the movies in the database on main page
router.get('/', (req, res) => {
  knex('movies')
    .select()
    .orderBy('id', 'asc')
    .then(data => {
      res.render('all', { data : data })
    })
});
//opens up a form for creating a new movie
router.get('/new', (req, res) => {
  res.render('new')
})
//CREATE a new movie in db with post
router.post('/', (req, res) => {
    //validation
    //create movie object
    var movie = {
      title: req.body.title,
      rating: req.body.rating,
      description: req.body.description,
      watched: true
    }
    if (req.body.watched === "on") {
      movie.watched = true
    } else {
      movie.watched = false
    }
    console.log(req.body.watched)
    console.log("WATCHED" + movie.watched)
    console.log("TITLE" + req.body.title)
    //connect to database
    knex('movies')
      //insert into database
      .insert(movie, 'id')
      //returns an array of length 1 -> redirect to id#
      .then(data => {
        const movie = data[0]
        res.redirect(`/movies`)
      })
})

router.get('/:id', (req, res) => {
  //grab the id# from the url
  const id = req.params.id;
  //validation
  if (!isNaN(id)) {
    //connect to the database
    knex('movies')
      //select the id in the db based on the id in the url
      .select().where('id', id)
      //grab the first row
      .first()
      //take the data rendered from above and then render to a view
      .then(data => {
        res.render('single', data)
      })
    } else {
      res.status(500);
      res.render('error', {
        message: 'invalid id'
      })
    }
})
//shows the edit form
router.get('/:id/edit', (req, res) => {
  //grab the id from the url
  const id = req.params.id;
  //connect to the database
  knex('movies')
    //select the id in the db based on the id in the url
    .select().where('id', id)
    //grab the first row
    .first()
    //take the data from above and render into a view
    .then(data => {
      console.log(data)
      res.render('edit', data)
    })
})
//UPDATES the record
router.put('/:id', (req, res) => {
  //validation
  //create movie object
  const movie = {
    title: req.body.title,
    rating: req.body.rating,
    description: req.body.description,
    watched: req.body.watched
  }
  //connect to db
  knex('movies')
    //find the db id based on the params
    .where('id', req.params.id)
    //update said id with the movie object
    .update(movie, 'id')
    //based on the info above, redirect to the proper route
    .then(data => {
      res.redirect(`/movies/${req.params.id}`)
    })
})
//delete a movie
router.delete('/:id', (req, res) => {
  //get the id based on the url
  const id = req.params.id;
  //connect to db
  knex('movies')
    //find the item in the db based on the id
    .where('id', id)
    //delete said item
    .delete()
    //redirect to the main page
    .then(() => {
      res.redirect('/movies')
    })
})

module.exports = router;
