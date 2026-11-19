
import React from 'react';
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { styles } from './globalStyles';
import { storeOptions, getStoreCounts } from './data';

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

export default function StoresScreen({ navigation, games = [] }) {
  const storeCounts = getStoreCounts(games);
  const totalGames = games.length;

  const openStore = async (url) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
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

  return (
    <View style={styles.container}>
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
        style={[
          styles.card,
          {
            marginTop: 16,
            marginBottom: 4,
            padding: 16,
          },
        ]}
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
        contentContainerStyle={{
          paddingTop: 18,
          paddingBottom: 24,
        }}
      >
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
              {/* STORE LIBRARY BUTTON */}
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Open ${store.name} library`}
                activeOpacity={0.8}
                onPress={() => openStoreLibrary(store)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
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
                  <Text style={styles.text}>
                    {store.name}
                  </Text>

                  <Text style={styles.subText}>
                    {details.subtitle}
                  </Text>

                  <Text
                    style={[
                      styles.helperText,
                      { marginTop: 5 },
                    ]}
                  >
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

                  <Text
                    style={{
                      color: '#64748b',
                      fontSize: 11,
                      marginTop: 7,
                    }}
                  >
                    Tap to view library →
                  </Text>
                </View>
              </TouchableOpacity>

              {/* VISIT STORE BUTTON */}
              <TouchableOpacity
                accessibilityRole="button"
                style={[
                  styles.smallButton,
                  {
                    marginLeft: 8,
                    paddingHorizontal: 10,
                  },
                ]}
                onPress={() => openStore(details.url)}
              >
                <Text style={styles.buttonText}>
                  Visit ↗
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* UNASSIGNED GAMES */}
        <View
          style={[
            styles.card,
            {
              padding: 16,
              marginBottom: 14,
            },
          ]}
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

        <Text
          style={[
            styles.helperText,
            {
              textAlign: 'center',
              marginTop: 8,
            },
          ]}
        >
          Store account integration will be added in future updates.
        </Text>
      </ScrollView>
    </View>
  );
}
