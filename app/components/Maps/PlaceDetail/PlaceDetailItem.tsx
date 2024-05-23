import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import Colors from '../../../shared/Colors';
import { Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

export default function PlaceDetailItem({place}) {  
  return (
    <View>
       <Text style={{ fontSize: 26, fontFamily: "Inter_400Regular" }}>
        {place.name}
      </Text>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginTop: 5,
          flexDirection: "row",
        }}
      >
        <AntDesign name="star" size={20} color={Colors.YELLOW} />
        <Text>{place.rating}</Text>
      </View>
      {place?.photos ? (
        <Image
          source={{
            uri:
              "https://maps.googleapis.com/maps/api/place/photo" +
              "?maxwidth=400" +
              "&photo_reference=" +
              place?.photos[0]?.photo_reference +
              "&key=AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk",
          }}
          style={{
            width: "100%",
            height: 160,
            borderRadius: 15,
            marginTop: 10,
          }}
        />
      ) : null}

      
        <Text
        style={{ fontSize: 16, marginTop: 10, color: Colors.DARK_GRAY }}
        numberOfLines={2}
        >
        Address: {place.vicinity?place.vicinity:place.formatted_address}
      </Text>
      {place?.opening_hours ? (
        <Text style={{ fontFamily: "" }}>
          {place?.opening_hours?.open_now == true ? 
          "(Open)" : 
          "(Closed)"}
        </Text>
      ) : null}


    <View className='flex flex-row gap-2 flex-wrap mt-2'>
          {
          place?.types 
          ?
          (
            place?.types.map((type,index)=>
              <Text key={index} className='bg-gray-200 px-2 border-solid rounded-xl'>
                {type}
              </Text>
              )
          )
          :
          null
          }        
      </View>

     
    </View>
  )
}  