import React, { useEffect, useState } from 'react'
import PlaceDetail from '../components/Maps/PlaceDetail/PlaceDetail';
import MapScreen from '../components/Maps/MapScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from "expo-location";
import { UserLocationContext } from '../context/UserLocationContext';


const Stack = createNativeStackNavigator();

export default function Maps() {
    const isAndroid=true;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    try{
      (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
       
      })();
    }
    catch(err){
      console.log(err);
      console.log(errorMsg);
    }
  },[])


  return (
    <UserLocationContext.Provider 
    value={{location,setLocation}}>
    <Stack.Navigator screenOptions={{
        gestureEnabled:true,
    }}>
        <Stack.Screen name='home-screen'
       options={{headerShown:false}}
        component={MapScreen} />
        <Stack.Group screenOptions={{
            presentation:'modal',
           
        }}>
        <Stack.Screen name="place-detail" 
          options={{title:""}}
        component={PlaceDetail}/>
        </Stack.Group>
    </Stack.Navigator>
    </UserLocationContext.Provider>

  )
}