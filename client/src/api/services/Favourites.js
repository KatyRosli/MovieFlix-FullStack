import client from '../client';

const getFavouriteRequest = async (setFavourites) => {
  const url = `${client().prefixUrl}favourites`;

  const response = await fetch(url, { mode: 'cors' });
  const responseJson = await response.json();
  console.log(responseJson);

  if (responseJson) {
    setFavourites(responseJson);
  }
 };

const addFavouriteRequest = async (movie, setFavourites) => {
  const url = `${client().prefixUrl}favourites`;
  const reqOptions = {
    mode: 'cors',
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  };

  const response = await fetch(url, reqOptions);
  await response.json();
 };

 export {getFavouriteRequest, addFavouriteRequest};