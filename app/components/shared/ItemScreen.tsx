import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
  } from "react-native";
  import React, { useEffect, useLayoutEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
  import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { useFavouritesContext } from "../../context/favouritecontext";
import { ToastAndroid } from "react-native";

  const ItemScreen = ({ route }) => {
    const navigation = useNavigation();
    const {favourites,addFavourite,removeFavourite} = useFavouritesContext();
    const [isFavourite, setIsFavourite] = useState(false);


    const data = route?.params?.param;
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, []);


    const getInitialRegion = () => {
      // A defaul region of map. Mostly in area close to your userbase.
      const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      let latitude = data?.latitude;
      let longitude = data?.longitude;
  
      if (latitude && longitude) {
        // Imperatively, coordinates values must be FLOAT
        latitude = parseFloat(latitude);
        longitude = parseFloat(latitude);
        const region = { ...initialRegion, latitude, longitude };
        return region;
      }
  
      return initialRegion;
    };
  
    const initialRegion = getInitialRegion();

    const goToMap = (data) => {
      // Navigate to the parent stack
      navigation.navigate('Hotel_List');
  
      // Navigate to the sibling tab
      navigation.navigate('map', { param: data });
    };

    useEffect(() => {
      setIsFavourite(favourites.some(fav => fav.latitude === data.latitude));
    }, [favourites,data.latitude]);

    
    const handleFavouriteToggle = () => {
      if (isFavourite) {
        removeFavourite(data);
        showToast(` Removed ${data?.name} from favourites`);

      } else {
        addFavourite(data);
        showToast(`Added ${data?.name} to favourites`)
      }
    };

    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    return (
      <SafeAreaView className="flex-1 bg-white relative">
        <ScrollView className="flex-1 px-4 py-6" contentContainerStyle={{paddingBottom:30}}>

          <View className="relative bg-white shadow-lg">
            <Image
              source={{
                uri: data?.photo?.images?.large?.url
                  ? data?.photo?.images?.large?.url
                  : "https://cdn.pixabay.com/photo/2015/10/30/12/22/eat-1014025_1280.jpg",
              }}
              className="w-full h-72 object-cover rounded-2xl"
            />
  
            <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-10 h-10 rounded-md items-center justify-center bg-white"
              >
                <FontAwesome5 name="chevron-left" size={24} color="#06B2BE" />
              </TouchableOpacity>

              <TouchableOpacity
          key={'touch'+data.latitude}
          className={`w-10 h-10 rounded-md items-center justify-center bg-[#06B2BE]`}
          onPress={handleFavouriteToggle}
        >
          <FontAwesome5 name="heartbeat" size={24} color={isFavourite ? '#fff' : 'black'} />
        </TouchableOpacity>


            </View>
  
            <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
              <View className="flex-row space-x-2 items-center">
                <Text className="text-[12px] font-bold text-gray-100">
                  {data?.price_level}
                </Text>
                <Text className="text-[32px] font-bold text-gray-100">
                  {data?.price}
                </Text>
              </View>
  
              <View className="px-2 py-1 rounded-md bg-teal-100">
                <Text>{data?.open_now_text}</Text>
              </View>
            </View>
          </View>
  
          <View className="mt-6">
            <Text className="text-[#428288] text-[24px] font-bold">
              {data?.name}
            </Text>
            <View className="flex-row items-center space-x-2 mt-2">
              <FontAwesome name="map-marker" size={25} color="#8C9EA6" />
              <Text className="text-[#8C9EA6] text-[20px] font-bold">
                {data?.location_string}
              </Text>
            </View>
          </View>
  
          <View className="mt-4 flex-row items-center justify-between">
            {data?.rating && (
              <View className=" flex-row items-center space-x-2">
                <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                  <FontAwesome name="star" size={24} color="#D58574" />
                </View>
                <View>
                  <Text className="text-[#515151]">{data?.rating}</Text>
                  <Text className="text-[#515151]">Ratings</Text>
                </View>
              </View>
            )}
  
            {data?.price_level && (
              <View className=" flex-row items-center space-x-2">
                <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                  <MaterialIcons name="attach-money" size={24} color="black" />
                </View>
                <View>
                  <Text className="text-[#515151]">{data?.price_level}</Text>
                  <Text className="text-[#515151]">Price Level</Text>
                </View>
              </View>
            )}
  
            {data?.bearing && (
              <View className=" flex-row items-center space-x-2">
                <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                  <FontAwesome5 name="map-signs" size={24} color="black" />
                </View>
                <View>
                  <Text className="text-[#515151] capitalize">
                    {data?.bearing}
                  </Text>
                  <Text className="text-[#515151]">Bearing</Text>
                </View>
              </View>
            )}
          </View>
  
          {data?.description && (
            <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
              {data?.description}
            </Text>
          )}
  
          {data?.cuisine && (
            <View className="flex-row gap-2 items-center justify-start flex-wrap mt-4">
              {data?.cuisine.map((n) => (
                <TouchableOpacity
                  key={n.key}
                  className="px-2 py-1 rounded-md bg-emerald-100"
                >
                  <Text>{n.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
  
          <View className=" space-y-2 mt-4 bg-gray-100 rounded-2xl px-4 py-2">
            {data?.phone && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="phone" size={24} color="#428288" />
                <Text className="text-lg">{data?.phone}</Text>
              </View>
            )}
            {data?.email && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="envelope" size={24} color="#428288" />
                <Text className="text-lg">{data?.email}</Text>
              </View>
            )}
            {data?.address && (
              <View className="items-center flex-row space-x-6">
                <FontAwesome name="map-pin" size={24} color="#428288" />
                <Text className="text-lg">{data?.address}</Text>
              </View>
            )}

                {/* Map */}
                {data?.latitude && data?.longitude && 
                <View className="rounded-3xl h-[220px] w-full overflow-hidden flex items-center justify-center relative">

                  <MapView
                    provider={PROVIDER_GOOGLE}
                    className="w-full h-full"
                    initialRegion={{
                      latitude: parseFloat(data?.latitude),
                      longitude: parseFloat(data?.longitude),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: parseFloat(data?.latitude),
                          longitude: parseFloat(data?.longitude),
                        }}
                        title={data?.name}
                        description={data?.address}

                        >
                            <Callout tooltip>
                                <View>
                                    <View className="flex bg-white/70 rounded-2xl px-4 py-3">
                                        <Text className="font-semibold mb-1">{data?.name}</Text>
                                        <Text>{data?.address}</Text>
                                    </View>
                                </View>
                            </Callout>

                        </Marker>
                     </MapView>

                    </View>
            }


            <TouchableOpacity className="mt-4 px-4 py-4 rounded-lg bg-[#06B2BE] items-center justify-center mb-12"
            // onPress={()=> goToMap(data)}
            >
              <Text
                className="text-3xl font-semibold uppercase tracking-wider text-gray-100">
                Map View
              </Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default ItemScreen;