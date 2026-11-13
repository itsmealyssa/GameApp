import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import BacklogScreen from './BacklogScreen';
import StatsScreen from './StatsScreen';
import StoresScreen from './StoresScreen';
import AddGameScreen from './AddGameScreen';
import DetailsScreen from './DetailsScreen';
import GameSearchScreen from './GameSearchScreen';
import { initialGames } from './data';
import { loadGames, saveGames } from './gameStorage';
import { styles } from './globalStyles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ games, storageError }) {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0c1320', borderTopColor: '#182338', height: 60, paddingBottom: 8 },
      tabBarActiveTintColor: '#1683ff',
      tabBarInactiveTintColor: '#64748b',
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Collection') iconName = focused ? 'grid' : 'grid-outline';
        else if (route.name === 'Backlog') iconName = focused ? 'time' : 'time-outline';
        else if (route.name === 'Stats') iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        else if (route.name === 'Stores') iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name='Collection'>{(props) => <HomeScreen {...props} games={games} storageError={storageError} />}</Tab.Screen>
      <Tab.Screen name='Backlog'>{(props) => <BacklogScreen {...props} games={games} />}</Tab.Screen>
      <Tab.Screen name='Stats'>{(props) => <StatsScreen {...props} games={games} />}</Tab.Screen>
      <Tab.Screen name='Stores' component={StoresScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [persistEnabled, setPersistEnabled] = useState(true);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    let isActive = true;
    loadGames()
      .then((savedGames) => { if (isActive) setGames(savedGames); })
      .catch((error) => {
        if (!isActive) return;
        setGames(initialGames);
        setPersistEnabled(false);
        setStorageError(`${error.message} Your sample collection is available for this session.`);
      })
      .finally(() => { if (isActive) setIsLoading(false); });
    return () => { isActive = false; };
  }, []);

  useEffect(() => {
    if (isLoading || !persistEnabled) return;
    saveGames(games).catch(() => {
      setStorageError('Could not save changes on this device. Your current session is still available.');
    });
  }, [games, isLoading, persistEnabled]);

  const saveGame = useCallback((game) => {
    setStorageError('');
    setPersistEnabled(true);
    setGames((currentGames) => {
      const alreadyExists = currentGames.some((item) => item.id === game.id);
      return alreadyExists ? currentGames.map((item) => item.id === game.id ? game : item) : [...currentGames, game];
    });
  }, []);

  const updateGame = useCallback((gameId, changes) => {
    setStorageError('');
    setPersistEnabled(true);
    setGames((currentGames) => currentGames.map((game) => game.id === gameId ? { ...game, ...changes } : game));
  }, []);

  const removeGame = useCallback((gameId) => {
    setStorageError('');
    setPersistEnabled(true);
    setGames((currentGames) => currentGames.filter((game) => game.id !== gameId));
  }, []);

  if (isLoading) return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator color='#1683ff' size='large' />
      <Text style={[styles.subText, { marginTop: 12 }]}>Loading your collection…</Text>
    </View>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#060a11' }, headerTintColor: '#FFFFFF', headerTitleStyle: { fontWeight: '700' } }}>
        <Stack.Screen name='MainTabs' options={{ headerShown: false }}>{(props) => <MainTabs {...props} games={games} storageError={storageError} />}</Stack.Screen>
        <Stack.Screen name='AddGame' options={{ title: 'Add a Game' }}>{(props) => <AddGameScreen {...props} games={games} onSaveGame={saveGame} />}</Stack.Screen>
        <Stack.Screen name='Details' options={{ title: 'Game Details' }}>{(props) => <DetailsScreen {...props} games={games} onUpdateGame={updateGame} onRemoveGame={removeGame} />}</Stack.Screen>
        <Stack.Screen name='GameSearch' options={{ title: 'Online Game Search' }}>{(props) => <GameSearchScreen {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
