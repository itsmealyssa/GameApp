import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './globalStyles';
import { getCollectionStats, getStatusColor, getStars, statusOptions } from './data';
import GameCover from './GameCover';

export default function HomeScreen({ navigation, games, storageError = '' }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const stats = getCollectionStats(games);
  const normalizedQuery = query.trim().toLowerCase();
  const shownGames = games.filter((game) => {
    const matchesStatus = filter === 'All' || game.status === filter;
    const matchesSearch = !normalizedQuery || game.title.toLowerCase().includes(normalizedQuery) || game.platform.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>COLLECT • PLAY • TRACK • REPEAT</Text>
      </View>
      <Text style={styles.title}>My Games</Text>
      <Text style={styles.subText}>{stats.total} owned · {stats.completed} completed · {stats.totalHours} hours</Text>
      {storageError ? <View style={styles.notice}><Text style={styles.noticeText}>{storageError}</Text></View> : null}
      <View style={[styles.statsRow, { marginTop: 12 }]}>
        {[
          { value: stats.total, label: 'OWNED' },
          { value: stats.backlog, label: 'BACKLOG' },
          { value: stats.playing, label: 'PLAYING' },
          { value: stats.completed, label: 'DONE' },
        ].map((item) => (
          <View key={item.label} style={styles.statBox}>
            <Text style={styles.statNumber}>{item.value}</Text>
            <Text style={styles.subText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <TextInput
        accessibilityLabel='Search your collection'
        autoCapitalize='none'
        placeholder='Search title or platform'
        placeholderTextColor='#64748b'
        style={[styles.input, styles.searchInput]}
        value={query}
        onChangeText={setQuery}
      />
      <View style={[styles.row, { marginBottom: 12 }]}>
        {['All', ...statusOptions].map((option) => (
          <TouchableOpacity key={option} accessibilityRole='button' style={[styles.chip, filter === option ? styles.chipActive : null]} onPress={() => setFilter(option)}>
            <Text style={filter === option ? styles.chipTextActive : styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {shownGames.length === 0 ? (
        <Text style={styles.emptyText}>{games.length === 0 ? 'No games yet. Add one to start your collection.' : 'No games match this search.'}</Text>
      ) : (
        <FlatList
          data={shownGames}
          keyExtractor={(game) => game.id}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps='handled'
          renderItem={({ item }) => (
            <TouchableOpacity accessibilityRole='button' accessibilityLabel={`Open ${item.title}`} style={styles.card} onPress={() => navigation.navigate('Details', { gameId: item.id })}>
              <GameCover game={item} />
              <View style={styles.cardInfo}>
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.subText}>{item.platform}</Text>
                <Text style={{ color: '#F9E2AF', fontSize: 12, marginTop: 3 }}>{item.rating > 0 ? getStars(item.rating) : 'Not rated'}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: getStatusColor(item.status) }]}><Text style={styles.badgeText}>{item.status}</Text></View>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.row}>
        <TouchableOpacity accessibilityRole='button' style={[styles.button, { flex: 1 }]} onPress={() => navigation.navigate('AddGame')}>
          <Text style={styles.buttonText}>+ Add Game</Text>
        </TouchableOpacity>
        <TouchableOpacity accessibilityRole='button' style={[styles.button, styles.secondaryButton, { flex: 1 }]} onPress={() => navigation.navigate('GameSearch')}>
          <Text style={styles.buttonText}>Find Online</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
