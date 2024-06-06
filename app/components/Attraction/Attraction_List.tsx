import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../shared/Header";
import ItemCard from "../shared/ItemCard";
import {attractionData} from '../../../data/attraction';
import {NotFound} from "../../../assets";

const Attraction_List = ({navigation}) => {
    const [mainData, setMainData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState(''); 

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5c85cde7e4msh9d3f3bed77ba0c1p14ac18jsnb43593151476',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      }


    useEffect(() => {
        setIsLoading(true);

        setMainData(attractionData.data);
        setFilteredData(attractionData.data);

        setIsLoading(false);

        // fetch('https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng?latitude=51.1657&longitude=10.4515', options)
        // .then((response: any) => response.json())
        // .then((data: any) => {
        //   setMainData(data)
        //   setFilteredData(data);
        // })
        // .catch(err => console.log(err))
        // .finally(() => {
        //     setIsLoading(false);
        // });

    }, []);

    const updateSearch = (se) => {
      const e  = se;
      setSearch(e);
  
      const filtered = mainData.filter((s) => {
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
            <Text style={{ fontFamily: 'Inter_500Medium'}} className="text-2xl px-4 mt-8">Explore Germany Attractions</Text>
            <View className="mt-2 flex flex-row items-center justify-evenly flex-wrap">
              {filteredData?.length > 0 ? (
                <>
                  {filteredData?.map((data, i) => (
                    <ItemCard
                      key={'attraction'+i}
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
    )

}

export default Attraction_List;