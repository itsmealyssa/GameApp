import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './globalStyles';

export default function StoresScreen() {
  const stores = [
    { name: 'Steam', note: 'Real sign-in needs a secure backend and Steam API key.' },
    { name: 'Epic Games', note: 'Official account integration is not configured.' },
    { name: 'PlayStation', note: 'Official library access is not configured.' },
    { name: 'Xbox', note: 'Microsoft/Xbox developer access is not configured.' },
    { name: 'Nintendo', note: 'Official library access is not configured.' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>
      <Text style={styles.title}>Game Stores</Text>
      <Text style={styles.subText}>Store linking is disabled until real provider sign-in is configured.</Text>
      <View style={{ marginTop: 16, gap: 10 }}>
        {stores.map((store) => (
          <View key={store.name} style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.text}>{store.name}</Text>
              <Text style={styles.subText}>{store.note}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
