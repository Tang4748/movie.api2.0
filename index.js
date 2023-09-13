const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

app.use(bodyParser.json());

let auth = require('./auth')(app);


const { ObjectId } = require('mongodb');

const mongoose = require('mongoose');
const Models = require('./models.js');

mongoose.connect('mongodb://localhost:27017/MyFlix', { useNewUrlParser: true, useUnifiedTopology: true });

const Movies = Models.Movie;
const Users = Models.User;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


/*let movies = [
  {
    Title: 'Silence of the Lambs',
    Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    Genre: {
      Name: 'Thriller',
      Description: 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.'
    },
    Director: {
      Name: 'Jonathan Demme',
      Bio: 'Robert Jonathan Demme was an American director, producer, and screenwriter.',
      Birth: '1944',
      Death: '2017'
    },
    ImagePath: 'silenceofthelambs.png',
    Featured: true
  },
  {
    Title: 'Inception',
    Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    Genre: {
      Name: 'Science Fiction',
      Description: 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts.'
    },
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'Christopher Edward Nolan is a British-American film director, screenwriter, and producer.',
      Birth: '1970'
    },
    ImagePath: 'inception.png',
    Featured: true
  },
  {
    Title: 'Pulp Fiction',
    Description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    Genre: {
      Name: 'Crime',
      Description: 'Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre.'
    },
    Director: {
      Name: 'Quentin Tarantino',
      Bio: 'Quentin Jerome Tarantino is an American filmmaker and screenwriter.',
      Birth: '1963'
    },
    ImagePath: 'pulpfiction.png',
    Featured: true
  },
  {
    Title: 'The Shawshank Redemption',
    Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    Genre: {
      Name: 'Drama',
      Description: 'Drama is a genre of narrative fiction intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Frank Darabont',
      Bio: 'Frank Arpad Darabont is a Hungarian-American film director, screenwriter, and producer.',
      Birth: '1959'
    },
    ImagePath: 'shawshankredemption.png',
    Featured: true
  },
  {
    Title: 'The Dark Knight',
    Description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
    Genre: {
      Name: 'Action',
      Description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence.'
    },
    Director: {
      Name: 'Christopher Nolan',
      Bio: 'Christopher Edward Nolan is a British-American film director, screenwriter, and producer.',
      Birth: '1970'
    },
    ImagePath: 'darkknight.png',
    Featured: true
  },
  {
    Title: 'Forrest Gump',
    Description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    Genre: {
      Name: 'Drama',
      Description: 'Drama is a genre of narrative fiction intended to be more serious than humorous in tone.'
    },
    Director: {
      Name: 'Robert Zemeckis',
      Bio: 'Robert Lee Zemeckis is an American director, producer, and screenwriter.',
      Birth: '1951'
    },
    ImagePath: 'forrestgump.png',
    Featured: true
  },
  {
    Title: 'Avatar',
    Description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    Genre: {
      Name: 'Science Fiction',
      Description: 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts.'
    },
    Director: {
      Name: 'James Cameron',
      Bio: 'James Francis Cameron is a Canadian film director, producer, and screenwriter.',
      Birth: '1954'
    },
    ImagePath: 'avatar.png',
    Featured: true
  },
  {
    Title: 'The Godfather',
    Description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    Genre: {
      Name: 'Crime',
      Description: 'Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre.'
    },
    Director: {
      Name: 'Francis Ford Coppola',
      Bio: 'Francis Ford Coppola is an American film director, producer, and screenwriter.',
      Birth: '1939'
    },
    ImagePath: 'godfather.png',
    Featured: true
  },
  {
    Title: 'Jurassic Park',
    Description: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    Genre: {
      Name: 'Adventure',
      Description: 'Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way.'
    },
    Director: {
      Name: 'Steven Spielberg',
      Bio: 'Steven Allan Spielberg is an American film director, producer, and screenwriter.',
      Birth: '1946'
    },
    ImagePath: 'jurassicpark.png',
    Featured: true
  },
  {
    Title: 'The Matrix',
    Description: 'A computer programmer discovers a hidden reality in which humanity is enslaved by machines and joins a rebellion to break free.',
    Genre: {
      Name: 'Science Fiction',
      Description: 'Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts.'
    },
    Director: {
      Name: 'The Wachowskis',
      Bio: 'Lana Wachowski and Lilly Wachowski are visionary directors known for their work in The Matrix trilogy.',
      Birth: 'Lana Wachowski: 1965, Lilly Wachowski: 1967'
    },
    ImagePath: 'matrix.png',
    Featured: true
  },
  {
    Title: 'The Lion King',
    Description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    Genre: {
      Name: 'Animation',
      Description: 'Animation is a method in which figures are manipulated to appear as moving images.'
    },
    Director: {
      Name: 'Roger Allers',
      Bio: 'Roger Allers is an American film director, screenwriter, and storyboard artist.',
      Birth: '1949'
    },
    ImagePath: 'lionking.png',
    Featured: true
  },
  {
    Title: "Harry Potter and the Sorcerer's Stone",
    Description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world.',
    Genre: {
      Name: 'Fantasy',
      Description: 'Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by real-world myth and folklore.'
    },
    Director: {
     : 'Chris Columbus',
      Bio: 'Chris Columbus is an American filmmaker and screenwriter.',
      Birth: '1958'
    },
    ImagePath: 'harrypotter.png',
    Featured: true
  }
]; 

let users = [
 [
  {
    ID: 1,
    Username: "user1",
    Password: "password1",
    Email: "user1@example.com",
    Birthday: "1990-01-01",
    FavoriteMovies: []
  },
  {
    ID: 2,
    Username: "user2",
    Password: "password2",
    Email: "user2@example.com",
    Birthday: "1995-02-15",
    FavoriteMovies: []
  },
  {
    ID: 3,
    Username: "user3",
    Password: "password3",
    Email: "user3@example.com",
    Birthday: "1988-06-10",
    FavoriteMovies: []
  },
  {
    ID: 4,
    Username: "user4",
    Password: "password4",
    Email: "user4@example.com",
    Birthday: "1992-11-20",
    FavoriteMovies: []
  },
  {
    ID: 5,
    Username: "user5",
    Password: "password5",
    Email: "user5@example.com",
    Birthday: "1985-09-30",
    FavoriteMovies: []
  }

 ]
];
*/ 

// CREATE requests
app.post('/users', async (req, res) => {
  console.log(req.body);
  await Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user) })
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

app.post ('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send('${movieTitle} has been added to ${id}`s favorites.');
  } else {      
    res.status(404).send('User not found.');
  } 
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', async (req, res) => {
  await Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});



// UPDATE requests

app.put('/users/:id', async (req, res) => {
  await Users.findOneAndUpdate({ '_id': req.params.id }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // This line makes sure that the updated document is returned
  .then((updatedUser) => {
    res.json(updatedUser);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error:' + err);
  })

});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', async (req, res) => { 
  await Movies.find()
    .then((Movies) => {
      res.status(201).json(Movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users', async (req, res) => {
  await Users.find()
    .then((Users) => {
      res.status(201).json(Users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/users/:Username', async (req, res) => {
  await Users.findOne({ Username: req.params.Username })
    .then((User) => {
      res.json(User);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.get('/movies/:Title', (req, res) => {
  const{ title } = req.params;
  const movie = movies.find( movie => movie.Title === title);
   if (movie) {
    res.status(200).json(movie);
   } else {
      res.status(404).send('Movie not found');
    }
}); 

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = Movies.find( movie => movie.Genre.Name === genreName).Genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send('Genre not found');
  }
});

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = Movies.find( movie => movie.Director.Name === directorName).Director;
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(404).send('Director not found');
  }
});

//DELETE requests

app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send('${movieTitle} has been removed from ${id}`s favorites.');
  } else {    
    res.status(404).send('User not found.');
  } 
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let User = Users.find( user => user.id == id);

  if (User) {
    users = users.filter( user => user.id != id);
    res.status(200).send('User has been deleted.');
  } else {    
    res.status(404).send('User not found.');
  } 
});

// Allow users to remove a movie from the favorites list (DELETE)
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieID } },
    { new: true }
  )
    .then(updatedUser => {
      res.json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.delete('/users/:Username', async (req, res) => {
  await Users.findOneAndRemove({ Username: req.params.Username })
    .then((User) => {
      if (!User) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
