import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Hotel_List from '../components/Hotel/Hotel_List';
import ItemScreen from '../components/shared/ItemScreen';
import Attraction_List from '../components/Attraction/Attraction_List';

const Stack = createNativeStackNavigator();

const Attraction = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Attraction_List" options={{headerShown:false}} component={Attraction_List} />
        <Stack.Screen name="ItemScreen" options={{headerShown:false}} component={ItemScreen} />
      </Stack.Navigator>    )
}

export default Attraction;