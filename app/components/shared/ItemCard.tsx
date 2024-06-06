import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFavouritesContext } from "../../context/favouritecontext";

const ItemCard = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);


  const {favourites,addFavourite,removeFavourite} = useFavouritesContext();

  useEffect(() => {
    setIsFavourite(favourites?.some(fav => fav.latitude === data.latitude));
  }, [favourites,data.latitude]);

  const handleFavouriteToggle = () => {
    if (isFavourite) {
      removeFavourite(data);
    } else {
      addFavourite(data);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ItemScreen", { param: data })}
      className="rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-white w-[172px] ml-2 my-2"
    >

        <View className="absolute right-0 top-5 pr-2 z-10">

        <TouchableOpacity
          key={'touch'+data.latitude}
          className={`w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]`}
          onPress={handleFavouriteToggle}
        >
          <FontAwesome5 name="heartbeat" size={24} color={isFavourite ? '#fff' : 'black'} />
        </TouchableOpacity>

        </View>

      <Image
        source={{ uri: imageSrc }}
        className="w-full h-40 rounded-md object-cover"
      />

      {title ? (
        <>
          <Text className="text-[#428288] text-[18px] font-bold">
            {title?.length > 12 ? `${title.slice(0, 12)}..` : title}
          </Text>

          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={20} color="#8597A2" />
            <Text className="text-[#428288] text-[14px] font-bold">
              {location?.length > 14 ? `${title.slice(0, 14)}..` : location}
            </Text>
          </View>
        </>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  )
};

export default ItemCard;