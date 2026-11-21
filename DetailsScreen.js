
import React from 'react';
import {
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { styles } from './globalStyles';

import {
  statusOptions,
  storeOptions,
  getStatusColor,
  getStoreName,
} from './data';

import GameCover from './GameCover';

export default function DetailsScreen({
  route,
  navigation,
  games,
  onUpdateGame,
  onRemoveGame,
}) {
  const { gameId } = route.params;
  const game = games.find((item) => item.id === gameId);

  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Game not found.</Text>
      </View>
    );
  }

  const ratingNumbers = [1, 2, 3, 4, 5];
  const storeName = getStoreName(game.storeId);

  const isSteamImport =
    game.source === 'steam' ||
    Number(game.steamAppId) > 0 ||
    String(game.id).startsWith('steam-');

  const changeStore = (storeId) => {
    if (isSteamImport) return;
    onUpdateGame(gameId, { storeId });
  };

  const changeStatus = (status) => {
    if (isSteamImport) return;
    onUpdateGame(gameId, { status });
  };

  const removeGame = () => {
    const confirmRemoval = () => {
      if (typeof onRemoveGame !== 'function') {
        Alert.alert(
          'Removal Unavailable',
          'The remove game function is not available.'
        );
        return;
      }

      onRemoveGame(gameId);
      navigation.goBack();
    };

    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        `Are you sure you want to remove "${game.title}" from your collection?`
      );

      if (confirmed) confirmRemoval();
      return;
    }

    Alert.alert(
      'Remove this game?',
      `${game.title} will be removed from your collection.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: confirmRemoval,
        },
      ]
    );
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#060a11',
      }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* GAME COVER */}
      <View
        style={{
          alignItems: 'center',
          marginBottom: 8,
        }}
      >
        <GameCover game={game} large />
      </View>

      {/* GAME INFORMATION */}
      <Text style={styles.title}>
        {game.title}
      </Text>

      <Text style={styles.subText}>
        Platform: {game.platform}
      </Text>

      <Text style={styles.subText}>
        Store: {storeName}
      </Text>

      <Text style={styles.subText}>
        {game.hours} hours played
      </Text>

      {isSteamImport && (
        <Text
          style={{
            color: '#66c0f4',
            fontSize: 12,
            fontWeight: '700',
            marginTop: 6,
          }}
        >
          STEAM IMPORTED GAME
        </Text>
      )}

      {/* CURRENT STATUS */}
      <View
        style={[
          styles.badge,
          {
            backgroundColor: getStatusColor(game.status),
            alignSelf: 'flex-start',
            marginTop: 10,
          },
        ]}
      >
        <Text style={styles.badgeText}>
          {game.status}
        </Text>
      </View>

      {/* CHANGE STORE */}
      {!isSteamImport && (
        <>
          <Text style={styles.label}>Change Store</Text>

          <View style={styles.row}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{
                selected: !game.storeId,
              }}
              style={[
                styles.chip,
                !game.storeId ? styles.chipActive : null,
              ]}
              onPress={() => changeStore(null)}
            >
              <Text
                style={
                  !game.storeId
                    ? styles.chipTextActive
                    : styles.chipText
                }
              >
                Unassigned
              </Text>
            </TouchableOpacity>

            {storeOptions.map((store) => (
              <TouchableOpacity
                key={store.id}
                accessibilityRole="button"
                accessibilityState={{
                  selected: game.storeId === store.id,
                }}
                style={[
                  styles.chip,
                  game.storeId === store.id
                    ? styles.chipActive
                    : null,
                ]}
                onPress={() => changeStore(store.id)}
              >
                <Text
                  style={
                    game.storeId === store.id
                      ? styles.chipTextActive
                      : styles.chipText
                  }
                >
                  {store.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* STEAM LOCK NOTICE */}
      {isSteamImport && (
        <Text style={styles.helperText}>
          Store and story status are locked for Steam-imported games.
          Steam library information controls the store and synced progress.
        </Text>
      )}

      {/* YOUR RATING */}
      <Text style={styles.label}>Your Rating</Text>

      <View style={styles.row}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity
            key={number}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${number} out of 5`}
            onPress={() =>
              onUpdateGame(gameId, { rating: number })
            }
          >
            <Text style={styles.star}>
              {number <= game.rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subText}>
        {game.rating === 0
          ? 'Not rated yet'
          : `You rated this ${game.rating}/5`}
      </Text>

      {/* STORY STATUS */}
      {!isSteamImport && (
        <>
          <Text style={styles.label}>Story Status</Text>

          <View style={styles.row}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                accessibilityRole="button"
                accessibilityState={{
                  selected: game.status === option,
                }}
                style={[
                  styles.chip,
                  game.status === option
                    ? styles.chipActive
                    : null,
                ]}
                onPress={() => changeStatus(option)}
              >
                <Text
                  style={
                    game.status === option
                      ? styles.chipTextActive
                      : styles.chipText
                  }
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* EDIT GAME */}
      {!isSteamImport && (
        <TouchableOpacity
          accessibilityRole="button"
          style={[styles.button, styles.secondaryButton]}
          onPress={() =>
            navigation.navigate('AddGame', { gameId })
          }
        >
          <Text style={styles.buttonText}>
            Edit Game Details
          </Text>
        </TouchableOpacity>
      )}

      {/* REMOVE GAME */}
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Remove from Collection"
        style={[styles.button, styles.dangerButton]}
        onPress={removeGame}
      >
        <Text style={styles.buttonText}>
          Remove from Collection
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
