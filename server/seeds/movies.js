
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      const movies = [
        {
          title: 'Lion King',
          rating: 4,
          description: 'this was a movie about animals',
          watched: true
        },
        {
          title: 'Ghostbuster',
          rating: 5,
          description: 'this was a movie about ghosts',
          watched: false
        }
      ]
      return knex('movies').insert(movies)
    });
};
