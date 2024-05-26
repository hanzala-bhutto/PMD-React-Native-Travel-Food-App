import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const FavouritesContext = createContext<any | null>(null);
const useFavouritesContext = () => useContext(FavouritesContext);

const FavouritesContextProvider = ({children}: any) => {
  const [favourites, setFavourites] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('favourites').then((data: any) => {
      if (data) {
        setFavourites(JSON.parse(data));
      } else setFavourites([]);
    });
  }, []);

  const addFavourite = (data: any) => {

    // check it already exists, it will be ignored
    if (favourites.includes(data)) {
      return;
    }
    const newData = [...favourites, data];
    // console.log(newData);
    setFavourites(newData);
    AsyncStorage.setItem('favourites', JSON.stringify(newData));

  };

  const removeFavourite = (data: any) => {

    // remove the data to the existing favorites
    const newData = favourites.filter((item: any) => item !== data);
    setFavourites(newData);
    AsyncStorage.setItem('favourites', JSON.stringify(newData));
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite}}>
      {children}
    </FavouritesContext.Provider>
  );
};

export {FavouritesContextProvider, useFavouritesContext};
