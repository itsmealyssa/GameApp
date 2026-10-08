// AddGameScreen.js ine dinhi kun diin makikita sa game screen
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions } from './data';

export default function AddGameScreen({ navigation, games, setGames }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('');
  const [status, setStatus] = useState('Backlog');
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const ratingNumbers = [1, 2, 3, 4, 5];

  const handleSave = () => {
    if (title === '') {      // Prevents saving if the game title is empty
      setErrorMessage('Please enter a game title.');
      return;
    }
// Creates a new game object using the user's input
    const newGame = {
      id: Date.now().toString(),
      title: title,
      platform: platform === '' ? 'Unknown' : platform,
      status: status,
      rating: rating,
    };
    // Adds the new game to the existing games array
    // This is the important line that makes the new game available
    // to the Game/Collection screen
    setGames([...games, newGame]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Game Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Minecraft"
        placeholderTextColor="#64748b"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
  // Game title input
      <Text style={styles.label}>Platform</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. PC, PS5, Switch"
        placeholderTextColor="#64748b"
        value={platform}
        onChangeText={(text) => setPlatform(text)}
      />

      <Text style={styles.label}>Story Status</Text>
      <View style={styles.row}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, status === option ? styles.chipActive : null]}
            onPress={() => setStatus(option)}
          >
            <Text style={status === option ? styles.chipTextActive : styles.chipText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Rating (tap a star)</Text>
      <View style={styles.row}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity key={number} onPress={() => setRating(number)}>
            <Text style={styles.star}>{number <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {errorMessage !== '' ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Game</Text>
      </TouchableOpacity>
    </View>
  );
}
