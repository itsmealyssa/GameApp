// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions, getStatusColor, getStars } from './data';

export default function HomeScreen({ navigation, games }) {
  const [filter, setFilter] = useState('All');

  const filterOptions = ['All', ...statusOptions];

  const backlogCount = games.filter((game) => game.status === 'Backlog').length;
  const playingCount = games.filter((game) => game.status === 'Playing').length;
  const completedCount = games.filter((game) => game.status === 'Completed').length;

  let shownGames = games;
  if (filter !== 'All') {
    shownGames = games.filter((game) => game.status === filter);
  }

  return (
    <View style={styles.container}>
      {/* GameVault Header Branding */}
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>

      <Text style={styles.title}>My Games</Text>
      <Text style={styles.subText}>
        {games.length} owned · {completedCount} completed · 170 hours
      </Text>

      {/* 4-Stat Summary Boxes */}
      <View style={[styles.statsRow, { marginTop: 12 }]}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{games.length}</Text>
          <Text style={styles.subText}>OWNED</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{backlogCount}</Text>
          <Text style={styles.subText}>BACKLOG</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{playingCount}</Text>
          <Text style={styles.subText}>PLAYING</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.subText}>DONE</Text>
        </View>
      </View>

      {/* Filter Buttons */}
      <View style={[styles.row, { marginBottom: 12 }]}>
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, filter === option ? styles.chipActive : null]}
            onPress={() => setFilter(option)}
          >
            <Text style={filter === option ? styles.chipTextActive : styles.chipText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Game FlatList */}
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
              {item.image ? (
                <Image source={item.image} style={styles.cover} />
              ) : (
                <View style={[styles.cover, styles.coverPlaceholder]}>
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

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddGame')}>
        <Text style={styles.buttonText}>+ Add Game</Text>
      </TouchableOpacity>
    </View>
  );
}