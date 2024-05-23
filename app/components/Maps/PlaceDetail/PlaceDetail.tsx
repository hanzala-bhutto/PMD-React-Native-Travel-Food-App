import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import PlaceDetailItem from './PlaceDetailItem';
import Colors from '../../../shared/Colors';
import GoogleMapView from './GoogleMapView';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import { ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function PlaceDetail() {
  const param=useRoute().params;
  const [place,setPlace]=useState([]);

  useEffect(()=>{
   setPlace(param.place)
  },[])

  return (
    <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      <PlaceDetailItem
        place={place}
      />
      <GoogleMapView placeList={[place]} />
    </ScrollView>
  );
}