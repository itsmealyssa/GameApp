
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
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
  const [openDropdown, setOpenDropdown] = useState(null);

  const stats = getCollectionStats(games);

  const storeFilters = [
    { id: 'All', name: 'All Stores' },
    ...storeOptions,
    { id: 'unassigned', name: 'Unassigned' },
  ];

  const shownGames = games.filter((game) => {
    const matchesStatus =
      filter === 'All' || game.status === filter;

    const matchesStore =
      storeFilter === 'All'
        ? true
        : storeFilter === 'unassigned'
          ? !game.storeId
          : game.storeId === storeFilter;

    return matchesStatus && matchesStore;
  });

  const statusFilters = ['All', ...statusOptions];

  const dropdownOptions =
    openDropdown === 'status'
      ? statusFilters.map((option) => ({
          id: option,
          name: option,
        }))
      : storeFilters;

  const selectedValue =
    openDropdown === 'status' ? filter : storeFilter;

  const selectOption = (option) => {
    if (openDropdown === 'status') {
      setFilter(option.id);
    } else {
      setStoreFilter(option.id);
    }

    setOpenDropdown(null);
  };

  return (
    <View style={[styles.container, { paddingBottom: 8 }]}>

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

      {/* COLLECTION TITLE */}
      <Text style={styles.title}>My Games</Text>

      <Text style={styles.subText}>
        {stats.total} owned · {stats.completed} completed · {stats.totalHours} hours
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
      <View style={[styles.statsRow, { marginTop: 8 }]}>
        {[
          { value: stats.total, label: 'OWNED' },
          { value: stats.backlog, label: 'BACKLOG' },
          { value: stats.playing, label: 'PLAYING' },
          { value: stats.played, label: 'PLAYED' },
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

      {/* STATUS AND STORE DROPDOWNS */}
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          marginTop: 4,
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Select status filter"
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0c1320',
            borderWidth: 1,
            borderColor: '#26364d',
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 13,
          }}
          onPress={() => setOpenDropdown('status')}
        >
          <Text style={styles.chipText}>Status</Text>
          <Text style={styles.chipText}>▼</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Select store filter"
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#0c1320',
            borderWidth: 1,
            borderColor: '#26364d',
            borderRadius: 10,
            paddingHorizontal: 14,
            paddingVertical: 13,
          }}
          onPress={() => setOpenDropdown('store')}
        >
          <Text style={styles.chipText}>Store</Text>
          <Text style={styles.chipText}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* DROPDOWN OPTIONS */}
      <Modal
        visible={openDropdown !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenDropdown(null)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpenDropdown(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.65)',
            justifyContent: 'center',
            paddingHorizontal: 28,
          }}
        >
          <View
            style={{
              backgroundColor: '#0c1320',
              borderRadius: 14,
              borderWidth: 1,
              borderColor: '#26364d',
              padding: 16,
              maxHeight: '70%',
            }}
          >
            <Text
              style={[
                styles.text,
                { fontSize: 17, marginBottom: 12 },
              ]}
            >
              {openDropdown === 'status' ? 'Status' : 'Store'}
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              {dropdownOptions.map((option) => {
                const isSelected =
                  selectedValue === option.id;

                return (
                  <TouchableOpacity
                    key={option.id}
                    onPress={() => selectOption(option)}
                    style={{
                      paddingVertical: 13,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                      marginBottom: 5,
                      backgroundColor: isSelected
                        ? '#26364d'
                        : 'transparent',
                    }}
                  >
                    <Text
                      style={
                        isSelected
                          ? styles.chipTextActive
                          : styles.chipText
                      }
                    >
                      {option.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              onPress={() => setOpenDropdown(null)}
              style={{
                alignItems: 'center',
                paddingVertical: 12,
                marginTop: 6,
                borderTopWidth: 1,
                borderTopColor: '#26364d',
              }}
            >
              <Text style={styles.subText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

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
              ? 'Your collection is empty. Connect Steam or find games online to get started.'
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

      {/* FIND GAMES ONLINE */}
      <View
        style={{
          marginTop: 8,
          marginBottom: 4,
        }}
      >
        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.button,
            styles.secondaryButton,
            {
              width: '100%',
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
