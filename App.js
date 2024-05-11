import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './app/navigation/TabNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect } from 'react';

import {  useFonts, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold,  Inter_900Black } from '@expo-google-fonts/inter';
import { ProfileContextProvider } from './app/context/profilecontext';

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) => console.log(''))
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App() {

  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight, 
    Inter_300Light,
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 4000);
  }, []);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>

      <ProfileContextProvider>
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </ProfileContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
