import { View, Text, Dimensions } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { UserLocationContext } from "./../../../context/UserLocationContext";
import PlaceMarker from "../shared/PlaceMarker";
import Colors from "./../../../shared/Colors";
import MapViewDirections from "react-native-maps-directions";

export default function GoogleMapView({placeList}) {
  const [mapRegion, setmapRegion] = useState([]);

  const { location, setLocation } = useContext(UserLocationContext);

  useEffect(()=>{
    if(location)
    {
        setmapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
        })
    }
    // console.log(placeList)
  },[location])
 

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, 
        marginBottom: 10, fontWeight: "600",fontFamily:'Inter_700Bold' }}>
        Google Maps
      </Text>
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
    {location?    <MapView
          style={{
            width: Dimensions.get("screen").width * 0.89,
            height: Dimensions.get("screen").height * 0.23,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          region={mapRegion}
        >
            <Marker 
            title="You" 
            coordinate={mapRegion}
             />
            {placeList.map((item,index)=>index<=4&&(
                <PlaceMarker item={item} key={index} />
            ))}
            {placeList.length>0&&<MapViewDirections
                origin={mapRegion}
                destination={{latitude:placeList[0]?.geometry?.location?.lat, longitude:placeList[0]?.geometry?.location?.lng}}
                apikey="AIzaSyA3FzKFHiA7bUcmOaubinG6wqCZt8Dw7Yk"
                strokeWidth={4}
                strokeColor={Colors.PRIMARY}
            />}



        </MapView>:null} 
        
      </View>
     
    </View>
  );
}