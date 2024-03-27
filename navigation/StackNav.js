// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import Screen2 from '../Screens/Screen2';
import Screen3 from '../Screens/Screen3';
import ProfileScreen from '../Screens/ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import {Image, View, Dimensions, StyleSheet} from 'react-native';
import DetailsScreen from '../Screens/DetailsScreen';
import CommentsScreen from '../Screens/CommentsScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const rw = Dimensions.get('window').width;
const rh = Dimensions.get('window').height;

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName="LogInScreen">
      <Stack.Screen
        name="LogInScreen"
        component={LoginScreen}
        options={{headerShown: false, gestureEnabled: true}}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNav}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};
const TabNav = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  focused
                    ? require('../assets/tabs/home.png')
                    : require('../assets/tabs/home.png')
                }
                style={styles.barIcon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  focused
                    ? require('../assets/tabs/loupe.png')
                    : require('../assets/tabs/loupe.png')
                }
                style={styles.barIcon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  focused
                    ? require('../assets/tabs/video.png')
                    : require('../assets/tabs/video.png')
                }
                style={styles.barIcon}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Screen4"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  focused
                    ? require('../assets/tabs/user.png')
                    : require('../assets/tabs/user.png')
                }
                style={styles.barIcon}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({
  barIcon: {
    width: rw * 0.07,
    height: rh * 0.033,
    marginTop: rh * 0.01,
  },
});
