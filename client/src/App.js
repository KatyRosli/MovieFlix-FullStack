import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import getMovieRequest from './api/services/Movies';
import Header from './components/Header';
import { getFavouriteRequest, addFavouriteRequest } from './api/services/Favourites';

const App = () => {
   const [movies, setMovies] = useState([]);
   const [favourites, setFavourites] = useState([]);
   const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      getMovieRequest(searchValue, setMovies);
    }

    // TODO: Load searchValue from LocalStorage
   }, [searchValue]);

   useEffect(() => {
    getFavouriteRequest(setFavourites)
   }, []);

   const saveToLocalStorage = (items) => {
    localStorage.setItem('searchValue', JSON.stringify(items));
   }

   const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    addFavouriteRequest(movie)
    setFavourites(newFavouriteList);
   }
   
   const removeFavouriteMovie = (movie) => {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
        );
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
   };

  return (
  <div className='container-fluid movie-app'>
  <Header /> 
    <div className='row'>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className='row'>
      <MovieListHeading heading='Movies'/>
    </div>
    <div className='row'>
      <MovieList
      movies={movies} 
      handleFavouritesClick={addFavouriteMovie} 
      favouriteComponent = {AddFavourites}
      />
    </div>
    <div className='row d-flex align-items-center mt-4 mb-4'>
      <MovieListHeading heading='Favourites'/>
    </div>
    <div className='row'>
      <MovieList 
      movies={favourites} 
      handleFavouritesClick={removeFavouriteMovie} 
      favouriteComponent={RemoveFavourites} 
      />
    </div>
  </div>
  );
};

export default App;
