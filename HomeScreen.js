
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './globalStyles';
import {
  getCollectionStats,
  getStatusColor,
  getStars,
  statusOptions,
} from './data';

import GameCover from './GameCover';

export default function HomeScreen({
  navigation,
  games,
  storageError = '',
}) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const stats = getCollectionStats(games);
  const normalizedQuery = query.trim().toLowerCase();

  const shownGames = games.filter((game) => {
    const matchesStatus =
      filter === 'All' || game.status === filter;

    const matchesSearch =
      !normalizedQuery ||
      game.title.toLowerCase().includes(normalizedQuery) ||
      game.platform.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });

  return (
    <View style={[styles.container, { paddingBottom: 8 }]}>

      {/* GAMEVAULT HEADER */}
      <View style={styles.headerBrand}>
        <Text style={styles.brandTitle}>GAMEVAULT</Text>
        <Text style={styles.brandSubtitle}>
          COLLECT • PLAY • TRACK • REPEAT
        </Text>
      </View>

      {/* COLLECTION TITLE */}
      <Text style={styles.title}>My Games</Text>

      <Text style={styles.subText}>
        {stats.total} owned · {stats.completed} completed · {stats.totalHours} hours
      </Text>

      {/* STORAGE ERROR */}
      {storageError ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>{storageError}</Text>
        </View>
      ) : null}

      {/* COLLECTION STATISTICS */}
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

      {/* SEARCH BAR */}
      <TextInput
        accessibilityLabel="Search your collection"
        autoCapitalize="none"
        placeholder="Search title or platform"
        placeholderTextColor="#64748b"
        style={[
          styles.input,
          styles.searchInput,
          {
            marginTop: 16,
            marginBottom: 12,
            minHeight: 58,
          },
        ]}
        value={query}
        onChangeText={setQuery}
      />

      {/* STATUS FILTERS */}
      <View
        style={[
          styles.row,
          {
            marginBottom: 16,
            gap: 8,
          },
        ]}
      >
        {['All', ...statusOptions].map((option) => (
          <TouchableOpacity
            key={option}
            accessibilityRole="button"
            style={[
              styles.chip,
              filter === option ? styles.chipActive : null,
            ]}
            onPress={() => setFilter(option)}
          >
            <Text
              style={
                filter === option
                  ? styles.chipTextActive
                  : styles.chipText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* GAME LIST */}
      <View style={{ flex: 1, minHeight: 100 }}>
        {shownGames.length === 0 ? (
          <Text style={styles.emptyText}>
            {games.length === 0
              ? 'No games yet. Add one to start your collection.'
              : 'No games match this search.'}
          </Text>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={shownGames}
            keyExtractor={(game) => game.id}
            contentContainerStyle={[
              styles.listContent,
              { paddingTop: 4, paddingBottom: 12 },
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Open ${item.title}`}
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Details', {
                    gameId: item.id,
                  })
                }
              >
                <GameCover game={item} />

                <View style={styles.cardInfo}>
                  <Text style={styles.text}>
                    {item.title}
                  </Text>

                  <Text style={styles.subText}>
                    {item.platform}
                  </Text>

                  <Text
                    style={{
                      color: '#F9E2AF',
                      fontSize: 12,
                      marginTop: 3,
                    }}
                  >
                    {item.rating > 0
                      ? getStars(item.rating)
                      : 'Not rated'}
                  </Text>
                </View>

                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: getStatusColor(item.status),
                    },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* BOTTOM ACTION BUTTONS */}
      <View
        style={[
          styles.row,
          {
            marginTop: 12,
            marginBottom: 4,
            gap: 12,
            flexWrap: 'nowrap',
          },
        ]}
      >
        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.button,
            {
              flex: 1,
              marginTop: 0,
            },
          ]}
          onPress={() => navigation.navigate('AddGame')}
        >
          <Text style={styles.buttonText}>
            + Add Game
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.button,
            styles.secondaryButton,
            {
              flex: 1,
              marginTop: 0,
            },
          ]}
          onPress={() => navigation.navigate('GameSearch')}
        >
          <Text style={styles.buttonText}>
            Find Online
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
