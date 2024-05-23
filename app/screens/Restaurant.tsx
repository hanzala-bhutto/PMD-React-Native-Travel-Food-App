import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemScreen from '../components/shared/ItemScreen';
import Restaurant_List from '../components/Restaurant/Restaurant_List';

const Stack = createNativeStackNavigator();

const Restaurant = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Restuarant_List" options={{headerShown:false}} component={Restaurant_List} />
      <Stack.Screen name="ItemScreen" options={{headerShown:false}} component={ItemScreen} />
  </Stack.Navigator>   
  )
};

export default Restaurant;
