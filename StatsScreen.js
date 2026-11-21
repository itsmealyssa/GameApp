
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
    { value: stats.played, label: 'Games played' },
    { value: stats.totalHours, label: 'Total gaming hours' },
    { value: stats.playing, label: 'Currently playing' },
    { value: stats.platformCount, label: 'Platforms represented' },
    { value: stats.averageRating, label: 'Average rating' },
  ];

  return (
    <View style={styles.container}>

      {/* CENTERED GAMEVAULT HEADER */}
      <View
        style={[
          styles.headerBrand,
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginBottom: 14,
          },
        ]}
      >
        {/* PIXEL-STYLE LOGO */}
        <Text
          style={[
            styles.brandTitle,
            {
              fontFamily: 'PressStart2P',
              fontSize: 20,
              color: '#60A5FA',
              textAlign: 'center',
              textShadowColor: '#8B5CF6',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 3,
            },
          ]}
        >
          GAMEVAULT
        </Text>

        {/* ORIGINAL SUBTITLE */}
        <Text
          style={[
            styles.brandSubtitle,
            {
              fontSize: 12,
              fontWeight: '700',
              letterSpacing: 1.8,
              color: '#CBD5E1',
              textAlign: 'center',
              marginTop: 6,
            },
          ]}
        >
          COLLECT • PLAY • TRACK • REPEAT
        </Text>
      </View>

     <Text style={[styles.title, { fontSize: 18 }]}>Statistics</Text>

      <Text style={styles.subText}>
        Your gaming journey, calculated from your collection.
      </Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        {statCards.map((card) => (
          <View key={card.label} style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.statNumber}>
                {card.value}
              </Text>

              <Text style={styles.subText}>
                {card.label}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
