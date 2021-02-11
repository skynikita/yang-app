import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button,View } from 'react-native';
import TabOneScreen from "./screens/TabOneScreen";
import TestScreen from "./screens/TestScreen";
import ProjectScreen from "./screens/ProjectScreen";
import TabTwoScreen from "./screens/TabTwoScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator(

);

const Tab = createBottomTabNavigator(
    /*   {
           TestScreen,
           ProjectScreen,
           TabTwoScreen
       }*/
);

export default function App() {

    const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <NavigationContainer >
            <Drawer.Navigator
             drawerType="permanent" initialRouteName="Home" drawerStyle={{
                backgroundColor: 'white',
                width: 240,
            }}>
                <Drawer.Screen  name="Home" component={TabOneScreen} />
                <Drawer.Screen name="Project" component={ProjectScreen}/>
                <Drawer.Screen name="About me" component={TabTwoScreen} />
                <Drawer.Screen name="Test" component={TestScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>

     /* <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>*/
    );
  }
}
