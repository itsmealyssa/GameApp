import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './globalStyles';

export default function StoresScreen() {
  const [connectedStores, setConnectedStores] = useState({
    Steam: false,
    Epic: false,
    PlayStation: false,
    Xbox: false,
    Nintendo: false,
  });

  const toggleConnect = (store) => {
    setConnectedStores((previousStores) => ({
      ...previousStores,
      [store]: !previousStores[store],
    }));
  };

  const stores = ['Steam', 'Epic', 'PlayStation', 'Xbox', 'Nintendo'];

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
        Connect your accounts to import owned games.
      </Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        {stores.map((store) => (
          <View key={store} style={styles.card}>

            <View style={styles.cardInfo}>
              <Text style={styles.text}>{store}</Text>

              <Text style={styles.subText}>
                {connectedStores[store]
                  ? 'Connected'
                  : 'Not connected'}
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.badge,
                {
                  backgroundColor: connectedStores[store]
                    ? '#F38BA8'
                    : '#1683ff',
                },
              ]}
              onPress={() => toggleConnect(store)}
            >
              <Text style={styles.badgeText}>
                {connectedStores[store]
                  ? 'Disconnect'
                  : 'Connect'}
              </Text>
            </TouchableOpacity>

          </View>
        ))}
      </View>

    </View>
  );
}