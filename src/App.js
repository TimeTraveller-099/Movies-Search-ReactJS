// API Key - fe54ffed
import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=fe54ffed';

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('Batman');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Batman');
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')
      searchMovies(searchTerm);
  }

  return (
    <div className="app">
      <h1>Ocean of Movies</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          type="text"
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value)}}
          onKeyDown={handleKeyDown}
        />

        <img 
          src={SearchIcon} 
          alt="search" 
          onClick={() => {searchMovies(searchTerm)}}
        />
      </div>

      {
        movies?.length > 0 
          ? (
            <div className='container'> 
              {movies.map((movie) => (
                <MovieCard movie = {movie} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;