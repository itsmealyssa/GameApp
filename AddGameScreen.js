import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './globalStyles';
import { createGameId, statusOptions } from './data';

export default function AddGameScreen({ navigation, route, games = [], onSaveGame }) {
  const existingGame = route?.params?.gameId ? games.find((game) => game.id === route.params.gameId) : null;
  const gameSeed = route?.params?.gameSeed || {};
  const [title, setTitle] = useState(existingGame?.title || gameSeed.title || '');
  const [platform, setPlatform] = useState(existingGame?.platform || gameSeed.platform || '');
  const [status, setStatus] = useState(existingGame?.status || gameSeed.status || 'Backlog');
  const [rating, setRating] = useState(existingGame?.rating || gameSeed.rating || 0);
  const [hours, setHours] = useState(String(existingGame?.hours ?? gameSeed.hours ?? 0));
  const [imageUrl, setImageUrl] = useState(existingGame?.imageUrl || gameSeed.imageUrl || '');
  const [removeLocalCover, setRemoveLocalCover] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ratingNumbers = [1, 2, 3, 4, 5];

  const handleSave = () => {
    const cleanTitle = title.trim();
    const cleanImageUrl = imageUrl.trim();
    if (!cleanTitle) return setErrorMessage('Please enter a game title.');
    if (cleanImageUrl && !/^https?:\/\/\S+$/i.test(cleanImageUrl)) return setErrorMessage('Cover URL must start with http:// or https://.');
    const parsedHours = Number(hours);
    if (!Number.isFinite(parsedHours) || parsedHours < 0) return setErrorMessage('Hours played must be zero or more.');

    onSaveGame({
      id: existingGame?.id || createGameId(),
      title: cleanTitle,
      platform: platform.trim() || 'Unknown',
      status,
      rating,
      hours: parsedHours,
      ...(cleanImageUrl ? { imageUrl: cleanImageUrl } : {}),
      ...(!cleanImageUrl && !removeLocalCover && existingGame?.imageAsset ? { imageAsset: existingGame.imageAsset } : {}),
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.subText}>{existingGame ? 'Update your game details and cover.' : 'Add it manually or start from an online result.'}</Text>
      <Text style={styles.label}>Game Title</Text>
      <TextInput accessibilityLabel='Game title' autoCapitalize='sentences' style={styles.input} placeholder='e.g. Minecraft' placeholderTextColor='#64748b' value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Platform</Text>
      <TextInput accessibilityLabel='Game platform' style={styles.input} placeholder='e.g. PC, PS5, Switch' placeholderTextColor='#64748b' value={platform} onChangeText={setPlatform} />
      <Text style={styles.label}>Cover image URL</Text>
      <TextInput accessibilityLabel='Cover image URL' autoCapitalize='none' autoCorrect={false} keyboardType='url' style={styles.input} placeholder='https://example.com/game-cover.jpg' placeholderTextColor='#64748b' value={imageUrl} onChangeText={(value) => { setImageUrl(value); setRemoveLocalCover(false); }} />
      <Text style={styles.helperText}>Use a direct image URL. Leave blank for the built-in cover or placeholder.</Text>
      {(imageUrl || existingGame?.imageAsset) ? (
        <TouchableOpacity accessibilityRole='button' style={[styles.button, styles.secondaryButton]} onPress={() => { setImageUrl(''); setRemoveLocalCover(true); }}>
          <Text style={styles.buttonText}>Remove cover image</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.label}>Story Status</Text>
      <View style={styles.row}>
        {statusOptions.map((option) => (
          <TouchableOpacity key={option} accessibilityRole='button' style={[styles.chip, status === option ? styles.chipActive : null]} onPress={() => setStatus(option)}>
            <Text style={status === option ? styles.chipTextActive : styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Hours played</Text>
      <TextInput accessibilityLabel='Hours played' keyboardType='decimal-pad' style={styles.input} placeholder='0' placeholderTextColor='#64748b' value={hours} onChangeText={setHours} />
      <Text style={styles.label}>Rating (tap a star)</Text>
      <View style={styles.row}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity key={number} accessibilityRole='button' accessibilityLabel={`Rate ${number} out of 5`} onPress={() => setRating(number)}>
            <Text style={styles.star}>{number <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TouchableOpacity accessibilityRole='button' style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{existingGame ? 'Save Changes' : 'Save Game'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
