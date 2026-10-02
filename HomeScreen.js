// HomeScreen.js
// Shows a summary, filter buttons, and the list of owned games.
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions, getStatusColor, getStars } from './data';

export default function HomeScreen({ navigation, games }) {
  const [filter, setFilter] = useState('All');

  // Spread operator: "All" + the 3 statuses
  const filterOptions = ['All', ...statusOptions];

  // .filter() to count each status
  const backlogCount = games.filter((game) => game.status === 'Backlog').length;
  const playingCount = games.filter((game) => game.status === 'Playing').length;
  const completedCount = games.filter((game) => game.status === 'Completed').length;

  // Conditional: show all games or only the chosen status
  let shownGames = games;
  if (filter !== 'All') {
    shownGames = games.filter((game) => game.status === filter);
  }

  return (
    <View style={styles.container}>
      {/* Summary boxes */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{games.length}</Text>
          <Text style={styles.subText}>Owned</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{backlogCount}</Text>
          <Text style={styles.subText}>Backlog</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{playingCount}</Text>
          <Text style={styles.subText}>Playing</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.subText}>Done</Text>
        </View>
      </View>

      {/* Filter buttons made with .map() */}
      <View style={[styles.row, { marginBottom: 12 }]}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, filter === option ? styles.chipActive : null]}
            onPress={() => setFilter(option)}
          >
            <Text style={styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* The game list */}
      {shownGames.length === 0 ? (
        <Text style={styles.emptyText}>No games here yet.</Text>
      ) : (
        <FlatList
          data={shownGames}
          keyExtractor={(game) => game.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Details', { gameId: item.id })}
            >
              {/* Conditional: show the cover, or a placeholder if there is none */}
              {item.image ? (
                <Image source={item.image} style={styles.cover} />
              ) : (
                <View style={[styles.cover, styles.coverPlaceholder]}>
                  <Text style={{ fontSize: 22 }}>🎮</Text>
                </View>
              )}
              <View style={styles.cardInfo}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.subText}>{item.platform}</Text>
                <Text style={{ color: '#F9E2AF', marginTop: 4 }}>{getStars(item.rating)}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddGame')}>
        <Text style={styles.buttonText}>+ Add Game</Text>
      </TouchableOpacity>
    </View>
  );
}
