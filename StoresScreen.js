
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './globalStyles';
import { storeOptions, getStoreCounts } from './data';

const STEAM_API_URL =
  'https://gamevault-steam-api.gamevault-steam-api-kenen.workers.dev/steam/games';

const storeDetails = {
  steam: {
    subtitle: 'PC Gaming Platform',
    description: 'Discover, purchase, and manage PC games.',
    icon: 'S',
    color: '#66c0f4',
    url: 'https://store.steampowered.com/',
  },
  epic: {
    subtitle: 'PC Gaming Platform',
    description: 'Explore PC games, offers, and free games.',
    icon: 'E',
    color: '#ffffff',
    url: 'https://store.epicgames.com/',
  },
  playstation: {
    subtitle: 'Console Gaming Platform',
    description: 'Explore games for PlayStation consoles.',
    icon: 'P',
    color: '#1683ff',
    url: 'https://www.playstation.com/',
  },
  xbox: {
    subtitle: 'Console Gaming Platform',
    description: 'Discover Xbox games and services.',
    icon: 'X',
    color: '#107c10',
    url: 'https://www.xbox.com/games/store',
  },
  nintendo: {
    subtitle: 'Console Gaming Platform',
    description: 'Explore Nintendo games and products.',
    icon: 'N',
    color: '#e60012',
    url: 'https://www.nintendo.com/store/',
  },
};

export default function StoresScreen({
  navigation,
  games = [],
  onImportSteamGames,
}) {
  const [steamProfile, setSteamProfile] = useState('');
  const [steamGames, setSteamGames] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [connectedSteamId, setConnectedSteamId] = useState('');
  const [steamMessage, setSteamMessage] = useState('');

  const storeCounts = getStoreCounts(games);
  const totalGames = games.length;

  const openStore = async (url) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        'Unable to open store',
        'Please check your internet connection and try again.'
      );
    }
  };

  const openStoreLibrary = (store) => {
    navigation.navigate('StoreLibrary', {
      storeId: store.id,
      storeName: store.name,
    });
  };

  const connectSteam = async () => {
    const profile = steamProfile.trim();

    if (!profile) {
      Alert.alert(
        'Missing Steam profile',
        'Enter your Steam ID or profile link.'
      );
      return;
    }

    setIsConnecting(true);
    setSteamGames([]);
    setSteamMessage('');
    setConnectedSteamId('');

    try {
      const response = await fetch(
        `${STEAM_API_URL}?profile=${encodeURIComponent(profile)}`
      );

      let result;

      try {
        result = await response.json();
      } catch {
        throw new Error(
          'The Steam server returned an invalid response.'
        );
      }

      if (!response.ok) {
        throw new Error(
          result?.error || 'Unable to retrieve your Steam library.'
        );
      }

      if (!Array.isArray(result.games)) {
        throw new Error('Steam did not return a valid game list.');
      }

      setSteamGames(result.games);
      setConnectedSteamId(result.steamId || '');

      setSteamMessage(
        result.games.length
          ? `Successfully retrieved ${result.games.length} games. Review them before importing.`
          : 'No games were found in this Steam library.'
      );
    } catch (error) {
      Alert.alert(
        'Steam Connection Failed',
        error.message || 'Unable to connect to Steam. Please try again.'
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const importSteamLibrary = () => {
    if (!steamGames.length) {
      Alert.alert(
        'No Games to Import',
        'Connect a Steam account and retrieve its games first.'
      );
      return;
    }

    if (typeof onImportSteamGames !== 'function') {
      Alert.alert(
        'Import Unavailable',
        'The Steam import handler is not available.'
      );
      return;
    }

    setIsImporting(true);

    try {
      const importedCount = onImportSteamGames(steamGames);

      setSteamMessage(
        `${importedCount} Steam games have been added or synced to GameVault.`
      );

      setSteamGames([]);

      Alert.alert(
        'Steam Library Imported',
        `${importedCount} games have been added or updated in your GameVault collection.`
      );
    } catch {
      Alert.alert(
        'Import Failed',
        'GameVault could not import the Steam games. Please try again.'
      );
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>
          COLLECT • PLAY • TRACK • REPEAT
        </Text>
      </View>

      <Text style={styles.title}>Game Stores</Text>

      <Text style={styles.subText}>
        Browse your favorite gaming platforms.
      </Text>

      {/* COLLECTION SUMMARY */}
      <View
        style={{
          backgroundColor: '#0c1320',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: '#182338',
          padding: 16,
          marginTop: 16,
        }}
      >
        <Text style={styles.label}>Your Store Libraries</Text>

        <Text
          style={{
            color: '#ffffff',
            fontSize: 28,
            fontWeight: '900',
            marginTop: 5,
          }}
        >
          {totalGames} Games
        </Text>

        <Text style={styles.subText}>
          {totalGames - storeCounts.unassigned} assigned to stores
        </Text>

        <Text
          style={{
            color: '#f9a825',
            fontSize: 12,
            fontWeight: '700',
            marginTop: 8,
          }}
        >
          {storeCounts.unassigned} UNASSIGNED
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: 18,
          paddingBottom: 24,
        }}
      >
        {/* STEAM CONNECTION */}
        <View
          style={{
            backgroundColor: '#0c1320',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#263f58',
            padding: 16,
            marginBottom: 18,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: 13,
                backgroundColor: '#182c3d',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Text
                style={{
                  color: '#66c0f4',
                  fontSize: 24,
                  fontWeight: '900',
                }}
              >
                S
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.text}>Connect Steam</Text>
              <Text style={styles.subText}>
                Import your Steam game library
              </Text>
            </View>
          </View>

          <Text style={styles.helperText}>
            Enter your 17-digit Steam ID or your Steam profile URL.
          </Text>

          <Text
            style={{
              color: '#aab8cc',
              fontSize: 12,
              fontWeight: '700',
              marginTop: 14,
              marginBottom: 7,
            }}
          >
            STEAM ID OR PROFILE LINK
          </Text>

          <TextInput
            accessibilityLabel="Steam ID or profile link"
            value={steamProfile}
            onChangeText={setSteamProfile}
            placeholder="Steam ID or profile URL"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            style={{
              backgroundColor: '#080f1b',
              borderWidth: 1,
              borderColor: '#26344c',
              borderRadius: 10,
              color: '#ffffff',
              paddingHorizontal: 13,
              paddingVertical: 13,
              fontSize: 14,
            }}
          />

          <Text style={styles.helperText}>
            Examples:
            {'\n'}76561199234531972
            {'\n'}steamcommunity.com/profiles/76561199234531972
            {'\n'}steamcommunity.com/id/yourusername
          </Text>

          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.8}
            disabled={isConnecting}
            onPress={connectSteam}
            style={{
              backgroundColor: '#1683ff',
              borderRadius: 10,
              paddingVertical: 13,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
              opacity: isConnecting ? 0.65 : 1,
            }}
          >
            {isConnecting ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 9,
                }}
              >
                <ActivityIndicator color="#ffffff" />
                <Text style={styles.buttonText}>
                  Connecting to Steam...
                </Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>
                Connect Steam
              </Text>
            )}
          </TouchableOpacity>

          {connectedSteamId ? (
            <Text
              style={{
                color: '#8bd5a7',
                fontSize: 12,
                marginTop: 12,
              }}
            >
              <Text style={{ fontWeight: '700' }}>
                Connected Steam ID:{' '}
              </Text>
              {connectedSteamId}
            </Text>
          ) : null}

          {steamMessage ? (
            <Text style={[styles.subText, { marginTop: 10 }]}>
              {steamMessage}
            </Text>
          ) : null}

          {/* IMPORT PREVIEW */}
          {steamGames.length > 0 ? (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: '#26344c',
                marginTop: 18,
                paddingTop: 16,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={styles.text}>Import Preview</Text>

                <Text
                  style={{
                    color: '#66c0f4',
                    fontSize: 13,
                    fontWeight: '800',
                  }}
                >
                  {steamGames.length} GAMES
                </Text>
              </View>

              {steamGames.map((game) => (
                <View
                  key={String(game.appId)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#080f1b',
                    borderWidth: 1,
                    borderColor: '#1c2b40',
                    borderRadius: 9,
                    padding: 12,
                    marginBottom: 8,
                  }}
                >
                  <View style={{ flex: 1, paddingRight: 12 }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        fontSize: 13,
                        fontWeight: '700',
                      }}
                    >
                      {game.title}
                    </Text>

                    <Text
                      style={{
                        color: '#8292a8',
                        fontSize: 11,
                        marginTop: 4,
                      }}
                    >
                      App ID: {game.appId}
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: '#66c0f4',
                      fontSize: 12,
                      fontWeight: '800',
                    }}
                  >
                    {Number(game.hours || 0).toFixed(1)} hrs
                  </Text>
                </View>
              ))}

              <TouchableOpacity
                accessibilityRole="button"
                activeOpacity={0.8}
                disabled={isImporting}
                onPress={importSteamLibrary}
                style={{
                  backgroundColor: '#1683ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  paddingVertical: 14,
                  paddingHorizontal: 12,
                  marginTop: 8,
                  opacity: isImporting ? 0.65 : 1,
                }}
              >
                {isImporting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.buttonText}>
                    Import {steamGames.length} Games into GameVault
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}

          <Text style={styles.helperText}>
            Your Steam Game Details privacy must be set to Public for your library to be retrieved.
          </Text>
        </View>

        {/* OTHER STORE CARDS */}
        {storeOptions.map((store) => {
          const details = storeDetails[store.id];
          const count = storeCounts[store.id] || 0;

          return (
            <View
              key={store.id}
              style={[
                styles.card,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 14,
                  marginBottom: 14,
                },
              ]}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: '#182338',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                  borderWidth: 1,
                  borderColor: '#26344c',
                }}
              >
                <Text
                  style={{
                    color: details.color,
                    fontSize: 25,
                    fontWeight: '900',
                  }}
                >
                  {details.icon}
                </Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{store.name}</Text>

                <Text style={styles.subText}>
                  {details.subtitle}
                </Text>

                <Text style={[styles.helperText, { marginTop: 5 }]}>
                  {details.description}
                </Text>

                <Text
                  style={{
                    color: '#1683ff',
                    fontSize: 13,
                    fontWeight: '800',
                    marginTop: 9,
                  }}
                >
                  {count} {count === 1 ? 'GAME' : 'GAMES'} IN LIBRARY
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    marginTop: 12,
                    gap: 8,
                  }}
                >
                  <TouchableOpacity
                    accessibilityRole="button"
                    style={[
                      styles.smallButton,
                      {
                        paddingHorizontal: 16,
                        paddingVertical: 10,
                      },
                    ]}
                    onPress={() => openStoreLibrary(store)}
                  >
                    <Text style={styles.buttonText}>
                      View Library →
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    accessibilityRole="button"
                    style={[
                      styles.secondaryButton,
                      {
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        borderRadius: 9,
                        borderWidth: 1,
                        borderColor: '#26344c',
                      },
                    ]}
                    onPress={() => openStore(details.url)}
                  >
                    <Text style={styles.buttonText}>
                      Visit Store ↗
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}

        {/* UNASSIGNED GAMES */}
        <View
          style={{
            backgroundColor: '#0c1320',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#182338',
            padding: 16,
            marginBottom: 14,
          }}
        >
          <Text style={styles.text}>Unassigned Games</Text>

          <Text style={styles.subText}>
            Games without a selected store.
          </Text>

          <Text
            style={{
              color: '#f9a825',
              fontSize: 20,
              fontWeight: '900',
              marginTop: 8,
            }}
          >
            {storeCounts.unassigned} Games
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
