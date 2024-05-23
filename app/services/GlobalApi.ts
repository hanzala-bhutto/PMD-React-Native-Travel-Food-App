const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const API_KEY = 'AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk'; // Replace 'YOUR_API_KEY' with your actual API key

const nearByPlace = (lat, lng, type) => {
  const url = `${BASE_URL}/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${API_KEY}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

const searchByText = (searchText) => {
  const url = `${BASE_URL}/textsearch/json?query=${searchText}&key=${API_KEY}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

export default{
    nearByPlace,
    searchByText
}