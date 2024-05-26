import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Hotel from '../screens/Hotel';
import Restaurant from '../screens/Restaurant';
import Profile from '../screens/Profile';
import Attraction from '../screens/Attraction';
import Colors from '../shared/Colors';
import Maps from '../screens/Maps';
import Favourites from '../screens/Favourite';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
            <Tab.Navigator >
            <Tab.Screen
                name="hotel"
                component={Hotel}
                options={{
                headerShown: false,
                title: 'Hotels',
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <FontAwesome5 name="hotel" color={color} size={size}/>
                ),
                }}
            />
            <Tab.Screen
                name="attraction"
                component={Attraction}
                options={{
                headerShown: false,
                title: 'Attractions',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="attractions" color={color} size={size} />
                ),
                }}
            />
            <Tab.Screen
                name="restaurant"
                component={Restaurant}
                options={{
                headerShown: false,
                title: 'Restaurants',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="restaurant" color={color} size={size} />
                ),
                }}
            />
            <Tab.Screen
                name="map"
                component={Maps}
                options={{
                headerShown: false,
                title: 'Map',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <FontAwesome5 name="map-marked-alt" color={color} size={size} />
                ),
                }}
            />

            <Tab.Screen
                name="favorite"
                component={Favourites}
                options={{
                headerShown: false,
                title: 'Favorites',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <MaterialIcons name="favorite" color={color} size={size} />
                ),
                }}
            />

            <Tab.Screen
                name="profile"
                component={Profile}
                options={{
                headerShown: false,
                title: 'Profile',
                tabBarActiveTintColor:Colors.PRIMARY,
                tabBarIcon: ({color, size}) => (
                    <FontAwesome5 name="user-edit" color={color} size={size} />
                ),
                }}
            />


            </Tab.Navigator>
    )
}

export default TabNavigation;