import client from '../client';

const getMovieRequest = async (searchValue, setMovies) => {
  const url = `${client().prefixUrl}movies?searchTerm=${searchValue}`;

  const response = await fetch(url, { mode: 'cors' });
  const responseJson = await response.json();

  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
 };

 export default getMovieRequest;