import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/shared/Header';
import { useFavouritesContext } from '../context/favouritecontext';
import ItemCard from '../components/shared/ItemCard';
import { NotFound } from '../../assets';

const Favourites = () => {

  const {favourites} = useFavouritesContext();

  const [favouritesList, setFavouritesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (favourites){
      // console.log(favourites)
      setFavouritesList(favourites);
      setFilteredData(favourites);
    }
  }, [favourites]);

  useEffect(() => {
    setIsLoading(false);
    // console.log(favouritesList);
  }, [favouritesList]);

  const updateSearch = (se) => {
    const e  = se;
    setSearch(e);

    const filtered = favouritesList.filter((s) => {
      return (
        s?.name?.toLowerCase().includes(e.toLowerCase())
      )
    })

    setFilteredData(filtered);

  }

  return (
    <ScrollView className="flex-1 bg-white p-4" contentContainerStyle={{paddingBottom:30}}>
    <Header search={search} updateSearch={updateSearch}/>
    {isLoading ? (
                <View className=" flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0B646B" />
                </View>
            ) : 
            <>
          <View className="mt-2 flex flex-row items-center justify-evenly flex-wrap">
              {filteredData?.length > 0 ? (
                <>
                  {filteredData?.map((data, i) => (
                    <ItemCard
                      key={'fav'+i}
                      imageSrc={
                        data?.photo?.images?.medium?.url
                          ? data?.photo?.images?.medium?.url
                          : "https://static.vecteezy.com/system/resources/previews/000/273/113/original/illustration-with-eiffel-tower-paris-vector.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center space-y-8 justify-center">
                    <Image
                      source={NotFound}
                      className=" w-32 h-32 object-cover"
                    />
                    <Text className="text-2xl text-[#428288] font-semibold">
                      Opps...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View>
            </>
            
    }

    </ScrollView>
  );
};

export default Favourites;