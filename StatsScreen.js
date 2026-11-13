import React from 'react';
import { Text, View } from 'react-native';
import { getCollectionStats } from './data';
import { styles } from './globalStyles';

export default function StatsScreen({ games }) {
  const stats = getCollectionStats(games);
  const statCards = [
    { value: stats.total, label: 'Games owned' },
    { value: `${stats.completed}/${stats.total}`, label: 'Story completed' },
    { value: `${stats.completionRate}%`, label: 'Completion rate' },
    { value: stats.totalHours, label: 'Total gaming hours' },
    { value: stats.playing, label: 'Currently playing' },
    { value: stats.platformCount, label: 'Platforms represented' },
    { value: stats.averageRating, label: 'Average rating' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.subText}>Your gaming journey, calculated from your collection.</Text>
      <View style={{ marginTop: 16, gap: 10 }}>
        {statCards.map((card) => (
          <View key={card.label} style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.statNumber}>{card.value}</Text>
              <Text style={styles.subText}>{card.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
