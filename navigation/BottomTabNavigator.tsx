import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ProjectScreen from '../screens/ProjectScreen'
import TestScreen from "../screens/TestScreen";
import {BottomTabParamList, ProjectParamList, TabOneParamList, TabTwoParamList,TestParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

    // @ts-ignore
    return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AboutMe"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
        }}
      />
        <BottomTab.Screen
            name="Project"
            component={ProjectNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-list" color={color} />,
            }}
        />
        <BottomTab.Screen
            name="Test"
            component={TestNavigator}
            options={{
                tabBarIcon: ({ color }) => <TabBarIcon name="ios-alert-sharp" color={color} />,
            }}
        />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3, marginHorizontal: -10 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Home' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'About Me' }}
      />
    </TabTwoStack.Navigator>
  );
}

const ProjectStack = createStackNavigator<ProjectParamList>();

function ProjectNavigator() {
    return (
      <ProjectStack.Navigator>
          <ProjectStack.Screen
              name="ProjectScreen"
              component={ProjectScreen}
              options={{ headerTitle:'Project'}}
              />
      </ProjectStack.Navigator>
    );
}
const TestStack = createStackNavigator<TestParamList>();

function TestNavigator() {
    return (
        <TestStack.Navigator>
            <TestStack.Screen
                name="TestScreen"
                component={TestScreen}
                options={{ headerTitle:'Test'}}
            />
        </TestStack.Navigator>
    );
}
