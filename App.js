
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import HomeScreen from './HomeScreen';
import BacklogScreen from './BacklogScreen';
import StatsScreen from './StatsScreen';
import StoresScreen from './StoresScreen';
import StoreLibraryScreen from './StoreLibraryScreen';
import AddGameScreen from './AddGameScreen';
import DetailsScreen from './DetailsScreen';
import GameSearchScreen from './GameSearchScreen';

import { initialGames } from './data';
import { loadGames, saveGames } from './gameStorage';
import { styles } from './globalStyles';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// MAIN NAVIGATION TABS
function MainTabs({
  games,
  storageError,
  onImportSteamGames,
}) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#060a11' }}
      edges={['top']}
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: '#0c1320',
            borderTopColor: '#182338',
            height: 60,
            paddingBottom: 8,
          },

          tabBarActiveTintColor: '#1683ff',
          tabBarInactiveTintColor: '#64748b',

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Collection') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Backlog') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Stats') {
              iconName = focused
                ? 'bar-chart'
                : 'bar-chart-outline';
            } else if (route.name === 'Stores') {
              iconName = focused
                ? 'cloud-upload'
                : 'cloud-upload-outline';
            }

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Collection">
          {(props) => (
            <HomeScreen
              {...props}
              games={games}
              storageError={storageError}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Backlog">
          {(props) => (
            <BacklogScreen
              {...props}
              games={games}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Stats">
          {(props) => (
            <StatsScreen
              {...props}
              games={games}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Stores">
          {(props) => (
            <StoresScreen
              {...props}
              games={games}
              onImportSteamGames={onImportSteamGames}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

// ROOT COMPONENT
export default function App() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [persistEnabled, setPersistEnabled] = useState(true);
  const [storageError, setStorageError] = useState('');

  // LOAD SAVED GAMES
  useEffect(() => {
    let isActive = true;

    loadGames()
      .then((savedGames) => {
        if (isActive) {
          setGames(savedGames);
        }
      })
      .catch((error) => {
        if (!isActive) return;

        setGames(initialGames);
        setPersistEnabled(false);

        setStorageError(
          `${error.message} Your sample collection is available for this session.`
        );
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  // SAVE GAMES WHEN COLLECTION CHANGES
  useEffect(() => {
    if (isLoading || !persistEnabled) return;

    saveGames(games).catch(() => {
      setStorageError(
        'Could not save changes on this device. Your current session is still available.'
      );
    });
  }, [games, isLoading, persistEnabled]);

  // ADD OR REPLACE A GAME
  const saveGame = useCallback((game) => {
    setStorageError('');
    setPersistEnabled(true);

    setGames((currentGames) => {
      const alreadyExists = currentGames.some(
        (item) => item.id === game.id
      );

      return alreadyExists
        ? currentGames.map((item) =>
            item.id === game.id ? game : item
          )
        : [...currentGames, game];
    });
  }, []);

  // UPDATE GAME DETAILS
  const updateGame = useCallback((gameId, changes) => {
    setStorageError('');
    setPersistEnabled(true);

    setGames((currentGames) =>
      currentGames.map((game) =>
        game.id === gameId
          ? { ...game, ...changes }
          : game
      )
    );
  }, []);

  // REMOVE A GAME
  const removeGame = useCallback((gameId) => {
    setStorageError('');
    setPersistEnabled(true);

    setGames((currentGames) =>
      currentGames.filter((game) => game.id !== gameId)
    );
  }, []);

  // IMPORT GAMES RETRIEVED FROM STEAM
  // GAMES WITH PLAYTIME ARE MARKED AS PLAYED.
  // ZERO-PLAYTIME GAMES ARE MARKED AS BACKLOG.
  // EXISTING PLAYING AND COMPLETED STATUSES ARE PRESERVED.
  const importSteamGames = useCallback((steamGames) => {
    if (!Array.isArray(steamGames) || steamGames.length === 0) {
      return 0;
    }

    setStorageError('');
    setPersistEnabled(true);

    setGames((currentGames) => {
      const updatedGames = [...currentGames];

      steamGames.forEach((steamGame) => {
        const appId = Number(steamGame.appId);

        if (!Number.isSafeInteger(appId) || appId <= 0) {
          return;
        }

        const hours = Math.max(
          0,
          Number(steamGame.hours) || 0
        );

        const steamStatus = hours > 0
          ? 'Played'
          : 'Backlog';

        const existingIndex = updatedGames.findIndex(
          (game) =>
            Number(game.steamAppId) === appId ||
            game.id === `steam-${appId}`
        );

        if (existingIndex >= 0) {
          const existingGame = updatedGames[existingIndex];

          const preserveManualStatus = [
            'Playing',
            'Completed',
          ].includes(existingGame.status);

          updatedGames[existingIndex] = {
            ...existingGame,
            title: steamGame.title || existingGame.title,
            platform: 'PC',
            storeId: 'steam',
            steamAppId: appId,
            source: 'steam',
            hours,
            status: preserveManualStatus
              ? existingGame.status
              : steamStatus,
            imageUrl:
              steamGame.imageUrl ||
              existingGame.imageUrl ||
              '',
          };
        } else {
          updatedGames.push({
            id: `steam-${appId}`,
            steamAppId: appId,
            source: 'steam',
            title: steamGame.title || `Steam App ${appId}`,
            platform: 'PC',
            storeId: 'steam',
            status: steamStatus,
            rating: 0,
            hours,
            imageUrl: steamGame.imageUrl || '',
          });
        }
      });

      return updatedGames;
    });

    return steamGames.length;
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor="#060a11"
        translucent={false}
      />

      {isLoading ? (
        <View style={styles.loadingScreen}>
          <ActivityIndicator
            color="#1683ff"
            size="large"
          />

          <Text style={[styles.subText, { marginTop: 12 }]}>
            Loading your collection…
          </Text>
        </View>
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#060a11',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: '700',
              },
            }}
          >
            {/* MAIN TABS */}
            <Stack.Screen
              name="MainTabs"
              options={{ headerShown: false }}
            >
              {(props) => (
                <MainTabs
                  {...props}
                  games={games}
                  storageError={storageError}
                  onImportSteamGames={importSteamGames}
                />
              )}
            </Stack.Screen>

            {/* STORE LIBRARY */}
            <Stack.Screen
              name="StoreLibrary"
              options={({ route }) => ({
                title: `${route.params?.storeName || 'Store'} Library`,
              })}
            >
              {(props) => (
                <StoreLibraryScreen
                  {...props}
                  games={games}
                />
              )}
            </Stack.Screen>

            {/* ADD GAME */}
            <Stack.Screen
              name="AddGame"
              options={{ title: 'Add a Game' }}
            >
              {(props) => (
                <AddGameScreen
                  {...props}
                  games={games}
                  onSaveGame={saveGame}
                />
              )}
            </Stack.Screen>

            {/* GAME DETAILS */}
            <Stack.Screen
              name="Details"
              options={{ title: 'Game Details' }}
            >
              {(props) => (
                <DetailsScreen
                  {...props}
                  games={games}
                  onUpdateGame={updateGame}
                  onRemoveGame={removeGame}
                />
              )}
            </Stack.Screen>

            {/* ONLINE GAME SEARCH */}
            <Stack.Screen
              name="GameSearch"
              options={{ title: 'Online Game Search' }}
            >
              {(props) => (
                <GameSearchScreen {...props} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
}
