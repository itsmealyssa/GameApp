// BacklogScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from './globalStyles';
import { getStatusColor, getStars } from './data';

export default function BacklogScreen({ navigation, games }) {

  // Get only the games that are currently marked as backlog
  const backlogGames = games.filter((game) => game.status === 'Backlog');

  return (
    <View style={styles.container}>
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>

      <Text style={styles.title}>Backlog</Text>
      <Text style={styles.subText}>{backlogGames.length} games waiting to be played</Text>

      {backlogGames.length === 0 ? (
        <Text style={styles.emptyText}>No backlog games here yet.</Text>
      ) : (
        <FlatList
          data={backlogGames}
          keyExtractor={(game) => game.id}

       // Render each backlog game as a selectable card
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', { gameId: item.id })}
            >
              {item.image ? (
                <Image source={item.image} style={styles.cover} />
              ) : (
                <View style={[styles.cover, styles.coverPlaceholder]}>

                //if no image available
                  <Text style={{ fontSize: 20 }}>🎮</Text>
                </View>
              )}
              <View style={styles.cardInfo}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.subText}>{item.platform}</Text>
                <Text style={{ color: '#F9E2AF', fontSize: 12, marginTop: 3 }}>
                  {item.rating > 0 ? getStars(item.rating) : 'Not rated'}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
