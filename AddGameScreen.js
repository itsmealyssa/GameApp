
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { styles } from './globalStyles';

import {
  statusOptions,
  storeOptions,
} from './data';

import GameCover from './GameCover';

export default function AddGameScreen({
  route,
  navigation,
  games = [],
  onSaveGame,
}) {
  const params = route.params || {};
  const gameId = params.gameId;
  const gameSeed = params.gameSeed;

  const existingGame = gameId
    ? games.find((game) => game.id === gameId)
    : null;

  const isEditing = Boolean(gameId);
  const isImporting = Boolean(gameSeed);

  const sourceGame = existingGame || gameSeed || {};

  const [title, setTitle] = useState(sourceGame.title || '');
  const [platform, setPlatform] = useState(sourceGame.platform || '');
  const [storeId, setStoreId] = useState(sourceGame.storeId || null);
  const [status, setStatus] = useState(sourceGame.status || 'Backlog');
  const [hours, setHours] = useState(String(sourceGame.hours ?? 0));
  const [rating, setRating] = useState(Number(sourceGame.rating) || 0);
  const [imageUrl, setImageUrl] = useState(sourceGame.imageUrl || '');
  const [saving, setSaving] = useState(false);

  const previewGame = {
    ...sourceGame,
    id: sourceGame.id || 'rawg-preview',
    title: title || 'Game Preview',
    imageUrl,
    source: sourceGame.source || (isImporting ? 'rawg' : undefined),
  };

  // BLOCK MANUAL GAME CREATION
  if (!isEditing && !isImporting) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Import a Game</Text>

        <Text style={styles.subText}>
          Games must be imported from Steam or found through online search.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('GameSearch')}
        >
          <Text style={styles.buttonText}>
            Find Games Online
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // GAME NOT FOUND
  if (isEditing && !existingGame) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Game not found.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // SAVE GAME
  const saveGame = () => {
    if (saving) return;

    const cleanTitle = title.trim();
    const cleanPlatform = platform.trim();
    const parsedHours = Number(hours);

    if (!cleanTitle) {
      Alert.alert(
        'Missing game title',
        'Please enter the game title.'
      );
      return;
    }

    if (!cleanPlatform) {
      Alert.alert(
        'Missing platform',
        'Please enter the game platform.'
      );
      return;
    }

    if (!Number.isFinite(parsedHours) || parsedHours < 0) {
      Alert.alert(
        'Invalid hours',
        'Please enter a valid number of hours.'
      );
      return;
    }

    if (typeof onSaveGame !== 'function') {
      Alert.alert(
        'Save unavailable',
        'The game could not be saved.'
      );
      return;
    }

    const game = {
      id: existingGame?.id || gameSeed.id,
      title: cleanTitle,
      platform: cleanPlatform,
      storeId,
      status,
      rating,
      hours: parsedHours,
      imageUrl: imageUrl.trim(),

      // Preserve the imported game source.
      ...(sourceGame.source
        ? { source: sourceGame.source }
        : isImporting
          ? { source: 'rawg' }
          : {}),

      // Preserve local cover images.
      ...(sourceGame.imageAsset
        ? { imageAsset: sourceGame.imageAsset }
        : {}),

      // Preserve Steam identification.
      ...(sourceGame.steamAppId
        ? { steamAppId: sourceGame.steamAppId }
        : {}),
    };

    setSaving(true);

    try {
      onSaveGame(game);
      navigation.goBack();
    } catch (error) {
      setSaving(false);

      Alert.alert(
        'Save failed',
        error.message || 'Could not save this game.'
      );
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#060a11' }}
      contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {isEditing ? 'Edit Game' : 'Review Game'}
      </Text>

      <Text style={styles.subText}>
        {isEditing
          ? 'Update your personal game information.'
          : 'Review the online game information before importing it.'}
      </Text>

      {/* COVER PREVIEW */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <GameCover game={previewGame} large />
      </View>

      {/* GAME INFORMATION */}
      <Text style={styles.label}>Game Information</Text>

      <Text style={styles.label}>Game Title</Text>

      <TextInput
        accessibilityLabel="Game title"
        style={styles.input}
        placeholder="Game title"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={setTitle}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Platform</Text>

      <TextInput
        accessibilityLabel="Game platform"
        style={styles.input}
        placeholder="e.g. PC, PS5, Xbox"
        placeholderTextColor="#64748b"
        value={platform}
        onChangeText={setPlatform}
        autoCapitalize="words"
      />

      <Text style={styles.label}>Cover Image URL</Text>

      <TextInput
        accessibilityLabel="Cover image URL"
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#64748b"
        value={imageUrl}
        onChangeText={setImageUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* STORE */}
      <Text style={styles.label}>Game Store</Text>

      <View style={styles.row}>
        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.chip,
            storeId === null ? styles.chipActive : null,
          ]}
          onPress={() => setStoreId(null)}
        >
          <Text
            style={
              storeId === null
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
            style={[
              styles.chip,
              storeId === store.id ? styles.chipActive : null,
            ]}
            onPress={() => setStoreId(store.id)}
          >
            <Text
              style={
                storeId === store.id
                  ? styles.chipTextActive
                  : styles.chipText
              }
            >
              {store.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* STATUS */}
      <Text style={styles.label}>Your Progress</Text>
      <Text style={styles.label}>Story Status</Text>

      <View style={styles.row}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option}
            accessibilityRole="button"
            style={[
              styles.chip,
              status === option ? styles.chipActive : null,
            ]}
            onPress={() => setStatus(option)}
          >
            <Text
              style={
                status === option
                  ? styles.chipTextActive
                  : styles.chipText
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* HOURS */}
      <Text style={styles.label}>Hours Played</Text>

      <TextInput
        accessibilityLabel="Hours played"
        style={styles.input}
        placeholder="0"
        placeholderTextColor="#64748b"
        value={hours}
        onChangeText={(value) => {
          if (/^\d*\.?\d*$/.test(value)) {
            setHours(value);
          }
        }}
        keyboardType="decimal-pad"
      />

      {/* RATING */}
      <Text style={styles.label}>Your Rating</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {[1, 2, 3, 4, 5].map((number) => (
          <TouchableOpacity
            key={number}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${number} out of 5`}
            onPress={() => setRating(number)}
          >
            <Text style={styles.star}>
              {number <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subText}>
        {rating === 0 ? 'Not rated yet' : `${rating} out of 5 stars`}
      </Text>

      {/* SAVE */}
      <TouchableOpacity
        accessibilityRole="button"
        disabled={saving}
        style={[
          styles.button,
          saving ? styles.buttonDisabled : null,
        ]}
        onPress={saveGame}
      >
        <Text style={styles.buttonText}>
          {saving
            ? 'Saving...'
            : isEditing
              ? 'Save Changes'
              : 'Import Game'}
        </Text>
      </TouchableOpacity>

      {/* CANCEL */}
      <TouchableOpacity
        accessibilityRole="button"
        style={[
          styles.button,
          styles.secondaryButton,
          { marginTop: 10 },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
