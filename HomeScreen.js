
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
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
  getStoreName,
  statusOptions,
  storeOptions,
} from './data';

import GameCover from './GameCover';

export default function HomeScreen({
  navigation,
  games,
  storageError = '',
}) {
  const [filter, setFilter] = useState('All');
  const [storeFilter, setStoreFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [showStoreFilters, setShowStoreFilters] = useState(false);

  const stats = getCollectionStats(games);
  const normalizedQuery = query.trim().toLowerCase();

  const storeFilters = [
    { id: 'All', name: 'All Stores' },
    ...storeOptions,
    { id: 'unassigned', name: 'Unassigned' },
  ];

  const selectedStore = storeFilters.find(
    (store) => store.id === storeFilter
  );

  const shownGames = games.filter((game) => {
    const matchesStatus =
      filter === 'All' || game.status === filter;

    const matchesStore =
      storeFilter === 'All'
        ? true
        : storeFilter === 'unassigned'
          ? !game.storeId
          : game.storeId === storeFilter;

    const matchesSearch =
      !normalizedQuery ||
      game.title.toLowerCase().includes(normalizedQuery) ||
      game.platform.toLowerCase().includes(normalizedQuery) ||
      getStoreName(game.storeId).toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesStore && matchesSearch;
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
        {stats.total} owned · {stats.completed} completed · {Number(stats.totalHours.toFixed(1))} hours
      </Text>

      {/* STORAGE ERROR */}
      {storageError ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            {storageError}
          </Text>
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
            <Text style={styles.statNumber}>
              {item.value}
            </Text>
            <Text style={styles.subText}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      {/* SEARCH BAR */}
      <TextInput
        accessibilityLabel="Search your collection"
        autoCapitalize="none"
        placeholder="Search title, platform or store"
        placeholderTextColor="#64748b"
        style={[
          styles.input,
          styles.searchInput,
          {
            marginTop: 12,
            marginBottom: 8,
            minHeight: 52,
          },
        ]}
        value={query}
        onChangeText={setQuery}
      />

      {/* STATUS FILTERS */}
      <Text
        style={[
          styles.label,
          { marginTop: 6, marginBottom: 4 },
        ]}
      >
        Filter by Status
      </Text>

      <View
        style={[
          styles.row,
          {
            marginBottom: 8,
            gap: 8,
          },
        ]}
      >
        {['All', ...statusOptions].map((option) => (
          <TouchableOpacity
            key={option}
            accessibilityRole="button"
            accessibilityState={{
              selected: filter === option,
            }}
            style={[
              styles.chip,
              filter === option ? styles.chipActive : null,
              { paddingVertical: 7, paddingHorizontal: 12 },
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

      {/* COLLAPSIBLE STORE FILTERS */}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{
          expanded: showStoreFilters,
        }}
        onPress={() => setShowStoreFilters(!showStoreFilters)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 11,
          paddingHorizontal: 12,
          backgroundColor: '#0c1320',
          borderWidth: 1,
          borderColor: '#182338',
          borderRadius: 10,
          marginBottom: 8,
        }}
      >
        <Text style={styles.chipText}>
          Filter by Store: {selectedStore?.name || 'All Stores'}
        </Text>

        <Text style={styles.chipText}>
          {showStoreFilters ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {showStoreFilters && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexGrow: 0,
            marginBottom: 10,
          }}
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingBottom: 4,
          }}
        >
          {storeFilters.map((store) => (
            <TouchableOpacity
              key={store.id}
              accessibilityRole="button"
              accessibilityState={{
                selected: storeFilter === store.id,
              }}
              style={[
                styles.chip,
                storeFilter === store.id
                  ? styles.chipActive
                  : null,
              ]}
              onPress={() => setStoreFilter(store.id)}
            >
              <Text
                style={
                  storeFilter === store.id
                    ? styles.chipTextActive
                    : styles.chipText
                }
              >
                {store.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* RESULTS COUNT */}
      <Text
        style={[
          styles.subText,
          { marginBottom: 4 },
        ]}
      >
        Showing {shownGames.length} of {games.length} games
      </Text>

      {/* GAME LIST */}
      <View style={{ flex: 1, minHeight: 100 }}>
        {shownGames.length === 0 ? (
          <Text style={styles.emptyText}>
            {games.length === 0
              ? 'No games yet. Add one to start your collection.'
              : 'No games match your selected filters.'}
          </Text>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={shownGames}
            keyExtractor={(game) => game.id}
            contentContainerStyle={[
              styles.listContent,
              {
                paddingTop: 4,
                paddingBottom: 12,
              },
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

                  <Text style={styles.subText}>
                    {getStoreName(item.storeId)}
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
            marginTop: 8,
            marginBottom: 4,
            gap: 10,
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
