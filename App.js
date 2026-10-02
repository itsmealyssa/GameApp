// App.js
// Entry point: holds the game list in useState and sets up the Stack Navigator.
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import AddGameScreen from './AddGameScreen';
import DetailsScreen from './DetailsScreen';
import { initialGames } from './data';

const Stack = createNativeStackNavigator();

export default function App() {
  // The app's "memory": the whole game collection lives here
  const [games, setGames] = useState(initialGames);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* We write the screen as a function so we can pass games/setGames as props */}
        <Stack.Screen name="Home" options={{ title: 'My Game Collection' }}>
          {(props) => <HomeScreen {...props} games={games} />}
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
