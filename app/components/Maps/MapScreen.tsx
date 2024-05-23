import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView , {  Marker,Heatmap  } from 'react-native-maps';
import SearchBar from './NearByPlaces/SearchBar';
import GoogleMapViewFull from './NearByPlaces/GoogleMapViewFull';
import BusinessList from './NearByPlaces/BusinessList';
import GlobalApi from './../../services/GlobalApi';

const MapScreen = ({route}) => {

  const [placeList,setPlaceList]=useState([]);

  useEffect(()=>{
       GetNearBySearchPlace('restaurant'); 
  },[])
  const GetNearBySearchPlace=(value)=>{
    GlobalApi.searchByText(value).then(resp=>{
          setPlaceList(resp.results);

    })
  } 

 
    return (

    <View>
      <View style={{position:'absolute',zIndex:20}}>
        <SearchBar setSearchText={(value)=>GetNearBySearchPlace(value)} />
      </View>
   
      <GoogleMapViewFull placeList={placeList}/>
      <View style={{position:'absolute',zIndex:20,bottom:0}}>
        <BusinessList placeList={placeList} />
      </View>
     
    </View>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;