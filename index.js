const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      uuid = require('uuid');

app.use(bodyParser.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

let movies = [
    {
      "_id": 1,
      "Title": "Silence of the Lambs",
      "Description": "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
      "Genre": {
        "Name": "Thriller",
        "Description": "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
      },
      "Director": {
        "Name": "Jonathan Demme",
        "Bio": "Robert Jonathan Demme was an American director, producer, and screenwriter.",
        "Birth": "1944",
        "Death": "2017"
      },
      "ImagePath": "silenceofthelambs.png",
      "Featured": true
    },
    {
      "_id": 2,
      "Title": "Inception",
      "Description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      "Genre": {
        "Name": "Science Fiction",
        "Description": "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts."
      },
      "Director": {
        "Name": "Christopher Nolan",
        "Bio": "Christopher Edward Nolan is a British-American film director, screenwriter, and producer.",
        "Birth": "1970"
      },
      "ImagePath": "inception.png",
      "Featured": true
    },
    {
      "_id": 3,
      "Title": "Pulp Fiction",
      "Description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      "Genre": {
        "Name": "Crime",
        "Description": "Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre."
      },
      "Director": {
        "Name": "Quentin Tarantino",
        "Bio": "Quentin Jerome Tarantino is an American filmmaker and screenwriter.",
        "Birth": "1963"
      },
      "ImagePath": "pulpfiction.png",
      "Featured": true
    },
    {
      "_id": 4,
      "Title": "The Shawshank Redemption",
      "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
      "Genre": {
        "Name": "Drama",
        "Description": "Drama is a genre of narrative fiction intended to be more serious than humorous in tone."
      },
      "Director": {
        "Name": "Frank Darabont",
        "Bio": "Frank Arpad Darabont is a Hungarian-American film director, screenwriter, and producer.",
        "Birth": "1959"
      },
      "ImagePath": "shawshankredemption.png",
      "Featured": true
    },
    {
      "_id": 5,
      "Title": "The Dark Knight",
      "Description": "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
      "Genre": {
        "Name": "Action",
        "Description": "Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence."
      },
      "Director": {
        "Name": "Christopher Nolan",
        "Bio": "Christopher Edward Nolan is a British-American film director, screenwriter, and producer.",
        "Birth": "1970"
      },
      "ImagePath": "darkknight.png",
      "Featured": true
    },
    {
      "_id": 6,
      "Title": "Forrest Gump",
      "Description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
      "Genre": {
        "Name": "Drama",
        "Description": "Drama is a genre of narrative fiction intended to be more serious than humorous in tone."
      },
      "Director": {
        "Name": "Robert Zemeckis",
        "Bio": "Robert Lee Zemeckis is an American director, producer, and screenwriter.",
        "Birth": "1951"
      },
      "ImagePath": "forrestgump.png",
      "Featured": true
    },
    {
      "_id": 7,
      "Title": "Avatar",
      "Description": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
      "Genre": {
        "Name": "Science Fiction",
        "Description": "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts."
      },
      "Director": {
        "Name": "James Cameron",
        "Bio": "James Francis Cameron is a Canadian film director, producer, and screenwriter.",
        "Birth": "1954"
      },
      "ImagePath": "avatar.png",
      "Featured": true
    },
    {
      "_id": 8,
      "Title": "The Godfather",
      "Description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      "Genre": {
        "Name": "Crime",
        "Description": "Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre."
      },
      "Director": {
        "Name": "Francis Ford Coppola",
        "Bio": "Francis Ford Coppola is an American film director, producer, and screenwriter.",
        "Birth": "1939"
      },
      "ImagePath": "godfather.png",
      "Featured": true
    },
    {
      "_id": 9,
      "Title": "Jurassic Park",
      "Description": "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
      "Genre": {
        "Name": "Adventure",
        "Description": "Adventure films are a genre of film that typically use their action scenes to display and explore exotic locations in an energetic way."
      },
      "Director": {
        "Name": "Steven Spielberg",
        "Bio": "Steven Allan Spielberg is an American film director, producer, and screenwriter.",
        "Birth": "1946"
      },
      "ImagePath": "jurassicpark.png",
      "Featured": true
    },
    {
      "_id": 10,
      "Title": "The Matrix",
      "Description": "A computer programmer discovers a hidden reality in which humanity is enslaved by machines and joins a rebellion to break free.",
      "Genre": {
        "Name": "Science Fiction",
        "Description": "Science fiction is a genre of speculative fiction that typically deals with imaginative and futuristic concepts."
      },
      "Director": {
        "Name": "The Wachowskis",
        "Bio": "Lana Wachowski and Lilly Wachowski are visionary directors known for their work in The Matrix trilogy.",
        "Birth": "Lana Wachowski: 1965, Lilly Wachowski: 1967"
      },
      "ImagePath": "matrix.png",
      "Featured": true
    },
    {
      "_id": 11,
      "Title": "The Lion King",
      "Description": "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
      "Genre": {
        "Name": "Animation",
        "Description": "Animation is a method in which figures are manipulated to appear as moving images."
      },
      "Director": {
        "Name": "Roger Allers",
        "Bio": "Roger Allers is an American film director, screenwriter, and storyboard artist.",
        "Birth": "1949"
      },
      "ImagePath": "lionking.png",
      "Featured": true
    },
    {
      "_id": 12,
      "Title": "Harry Potter and the Sorcerer's Stone",
      "Description": "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world.",
      "Genre": {
        "Name": "Fantasy",
        "Description": "Fantasy is a genre of speculative fiction set in a fictional universe, often inspired by real-world myth and folklore."
      },
      "Director": {
        "Name": "Chris Columbus",
        "Bio": "Chris Columbus is an American filmmaker and screenwriter.",
        "Birth": "1958"
      },
      "ImagePath": "harrypotter.png",
      "Featured": true
    }
];

let users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1',
    email: '',
    birthday: '',
    favoriteMovies: []
  },
];

// CREATE requests
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
    } else {
    res.status(400).send('Name is required.');
    }
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

// UPDATE requests

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { updatedUser } = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
      user.name = updatedUser.name;
      res.status(200).json('User has been updated.');
    } else {
      res.status(404).send('User not found.');
    }
});

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:title', (req, res) => {
  const{ title } = req.params;
  const movie = movies.find( movie => movie.title === title);
   if (movie) {
    res.status(200).json(movie);
   } else {
      res.status(404).send('Movie not found');
    }
}); 

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.genre.name === genreName).genre;
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(404).send('Genre not found');
  }
});

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.director.name === directorName).director;
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

  let user = users.find( user => user.id == id);

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send('User has been deleted.');
  } else {    
    res.status(404).send('User not found.');
  } 
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
