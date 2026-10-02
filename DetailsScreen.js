// DetailsScreen.js
// Shows one game. Lets the user rate it, change its status, or remove it.
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions, getStatusColor } from './data';

export default function DetailsScreen({ route, navigation, games, setGames }) {
  // Receive the id sent from HomeScreen
  const { gameId } = route.params;

  // .filter() returns an array, so we take the first (and only) match
  const game = games.filter((item) => item.id === gameId)[0];

  // Safety check in case the game was removed
  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Game not found.</Text>
      </View>
    );
  }

  const ratingNumbers = [1, 2, 3, 4, 5];

  // .map() + spread: copy the list, changing only this game
  const updateGame = (changes) => {
    setGames(games.map((item) => (item.id === gameId ? { ...item, ...changes } : item)));
  };

  const removeGame = () => {
    setGames(games.filter((item) => item.id !== gameId));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {game.image ? (
        <Image source={game.image} style={styles.coverLarge} />
      ) : (
        <View style={[styles.coverLarge, styles.coverPlaceholder]}>
          <Text style={{ fontSize: 48 }}>🎮</Text>
        </View>
      )}
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.subText}>Platform: {game.platform}</Text>

      <View style={[styles.badge, { backgroundColor: getStatusColor(game.status), alignSelf: 'flex-start', marginTop: 10 }]}>
        <Text style={styles.badgeText}>{game.status}</Text>
      </View>

      <Text style={styles.label}>Your Rating</Text>
      <View style={styles.row}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity key={number} onPress={() => updateGame({ rating: number })}>
            <Text style={styles.star}>{number <= game.rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subText}>
        {game.rating === 0 ? 'Not rated yet' : `You rated this ${game.rating}/5`}
      </Text>

      <Text style={styles.label}>Story Status</Text>
      <View style={styles.row}>
        {statusOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, game.status === option ? styles.chipActive : null]}
            onPress={() => updateGame({ status: option })}
          >
            <Text style={styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={removeGame}>
        <Text style={styles.buttonText}>Remove from Collection</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Back to Collection</Text>
      </TouchableOpacity>
    </View>
  );
}
