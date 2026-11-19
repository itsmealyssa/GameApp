
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

const stores = [
  {
    id: 'steam',
    name: 'Steam',
    subtitle: 'PC Gaming Platform',
    description: 'Discover, purchase, and manage PC games.',
    icon: 'S',
    color: '#66c0f4',
    url: 'https://store.steampowered.com/',
  },
  {
    id: 'epic',
    name: 'Epic Games',
    subtitle: 'PC Gaming Platform',
    description: 'Explore PC games, offers, and free games.',
    icon: 'E',
    color: '#ffffff',
    url: 'https://store.epicgames.com/',
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    subtitle: 'Console Gaming Platform',
    description: 'Explore games for PlayStation consoles.',
    icon: 'P',
    color: '#1683ff',
    url: 'https://www.playstation.com/',
  },
  {
    id: 'xbox',
    name: 'Xbox',
    subtitle: 'Console Gaming Platform',
    description: 'Discover Xbox games and services.',
    icon: 'X',
    color: '#107c10',
    url: 'https://www.xbox.com/games/store',
  },
  {
    id: 'nintendo',
    name: 'Nintendo',
    subtitle: 'Console Gaming Platform',
    description: 'Explore Nintendo games and products.',
    icon: 'N',
    color: '#e60012',
    url: 'https://www.nintendo.com/store/',
  },
];

export default function StoresScreen() {

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 18, paddingBottom: 24 }}
      >

        {stores.map((store) => (

          <View
            key={store.id}
            style={[
              styles.card,
              {
                alignItems: 'center',
                padding: 14,
                marginBottom: 14,
              },
            ]}
          >

            {/* STORE ICON */}
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
                  color: store.color,
                  fontSize: 25,
                  fontWeight: '900',
                }}
              >
                {store.icon}
              </Text>
            </View>

            {/* STORE INFORMATION */}
            <View style={{ flex: 1 }}>

              <Text style={styles.text}>
                {store.name}
              </Text>

              <Text style={styles.subText}>
                {store.subtitle}
              </Text>

              <Text
                style={[
                  styles.helperText,
                  { marginTop: 5 },
                ]}
              >
                {store.description}
              </Text>

              <Text
                style={{
                  color: '#f9a825',
                  fontSize: 11,
                  fontWeight: '700',
                  marginTop: 8,
                }}
              >
                NOT CONNECTED
              </Text>

              <TouchableOpacity
                accessibilityRole="button"
                style={[
                  styles.smallButton,
                  { marginTop: 10 },
                ]}
                onPress={() => openStore(store.url)}
              >
                <Text style={styles.buttonText}>
                  Visit Store ↗
                </Text>
              </TouchableOpacity>

            </View>

          </View>

        ))}

        <Text
          style={[
            styles.helperText,
            { textAlign: 'center', marginTop: 8 },
          ]}
        >
          Store account integration will be added in future updates.
        </Text>

      </ScrollView>

    </View>
  );
}
