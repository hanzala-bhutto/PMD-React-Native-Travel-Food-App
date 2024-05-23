import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Hotel_List from '../components/Hotel/Hotel_List';
import ItemScreen from '../components/shared/ItemScreen';

const Stack = createNativeStackNavigator();

const Hotels = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Hotel_List" options={{headerShown:false}} component={Hotel_List} />
      <Stack.Screen name="ItemScreen" options={{headerShown:false}} component={ItemScreen} />
    </Stack.Navigator>
  );
};

export default Hotels;
