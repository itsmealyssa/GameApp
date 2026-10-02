// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import BacklogScreen from './BacklogScreen'; // Can filter games with status === 'Backlog'
import StatsScreen from './StatsScreen';
import StoresScreen from './StoresScreen';
import AddGameScreen from './AddGameScreen';
import DetailsScreen from './DetailsScreen';
import { initialGames } from './data';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ games }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#0c1320', borderTopColor: '#182338' }, tabBarActiveTintColor: '#1683ff' }}>
      <Tab.Screen name="Collection">
        {(props) => <HomeScreen {...props} games={games} />}
      </Tab.Screen>
      <Tab.Screen name="Stats">
        {(props) => <StatsScreen {...props} games={games} />}
      </Tab.Screen>
      <Tab.Screen name="Stores" component={StoresScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [games, setGames] = useState(initialGames);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#060a11' }, headerTintColor: '#FFFFFF' }}>
        <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
          {(props) => <MainTabs {...props} games={games} />}
        </Stack.Screen>
        <Stack.Screen name="AddGame" options={{ title: 'Add a Game' }}>
          {(props) => <AddGameScreen {...props} games={games} setGames={setGames} />}
        </Stack.Screen>
        <Stack.Screen name="Details" options={{ title: 'Game Details' }}>
          {(props) => <DetailsScreen {...props} games={games} setGames={setGames} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}