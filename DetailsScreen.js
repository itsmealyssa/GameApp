// DetailsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions, getStatusColor } from './data';

export default function DetailsScreen({ route, navigation, games, setGames }) {

  // Retrieve the selected game using the ID passed from the collection screen
  const { gameId } = route.params;
  const game = games.filter((item) => item.id === gameId)[0];

 // Display a message if the selected game cannot be found
  if (!game) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Game not found.</Text>
      </View>
    );
  }
  // Available rating values from one to five stars
  const ratingNumbers = [1, 2, 3, 4, 5];

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
            <Text style={game.status === option ? styles.chipTextActive : styles.chipText}>
              {option}
            </Text>
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
