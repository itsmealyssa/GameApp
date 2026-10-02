// StatsScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './globalStyles';
import { calculateTotalHours } from './data';

export default function StatsScreen({ games }) {
  const ownedCount = games.length;
  const completedCount = games.filter(g => g.status === 'Completed').length;
  const playingCount = games.filter(g => g.status === 'Playing').length;
  
  // Conditional calculation for completion rate percentage
  const completionRate = ownedCount > 0 ? Math.round((completedCount / ownedCount) * 100) : 0;
  const totalHours = calculateTotalHours(games);

  return (
    <View style={styles.container}>
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>

      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.subText}>Your gaming journey</Text>

      <View style={{ marginTop: 16, gap: 10 }}>
        <View style={styles.card}><View style={styles.cardInfo}>
          <Text style={styles.statNumber}>{ownedCount}</Text>
          <Text style={styles.subText}>Games owned</Text>
        </View></View>

        <View style={styles.card}><View style={styles.cardInfo}>
          <Text style={styles.statNumber}>{completedCount}/{ownedCount}</Text>
          <Text style={styles.subText}>Story completed</Text>
        </View></View>

        <View style={styles.card}><View style={styles.cardInfo}>
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.subText}>Completion rate</Text>
        </View></View>

        <View style={styles.card}><View style={styles.cardInfo}>
          <Text style={styles.statNumber}>{totalHours}</Text>
          <Text style={styles.subText}>Total gaming hours</Text>
        </View></View>

        <View style={styles.card}><View style={styles.cardInfo}>
          <Text style={styles.statNumber}>{playingCount}</Text>
          <Text style={styles.subText}>Currently playing</Text>
        </View></View>
      </View>
    </View>
  );
}