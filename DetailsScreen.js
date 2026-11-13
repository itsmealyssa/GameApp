import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './globalStyles';
import { statusOptions, getStatusColor } from './data';
import GameCover from './GameCover';

export default function DetailsScreen({ route, navigation, games, onUpdateGame, onRemoveGame }) {
  const { gameId } = route.params;
  const game = games.find((item) => item.id === gameId);
  if (!game) return <View style={styles.container}><Text style={styles.text}>Game not found.</Text></View>;
  const ratingNumbers = [1, 2, 3, 4, 5];
  const removeGame = () => Alert.alert('Remove this game?', `${game.title} will be removed from your collection.`, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Remove', style: 'destructive', onPress: () => { onRemoveGame(gameId); navigation.goBack(); } },
  ]);

  return (
    <View style={styles.container}>
      <GameCover game={game} large />
      <Text style={styles.title}>{game.title}</Text>
      <Text style={styles.subText}>Platform: {game.platform}</Text>
      <Text style={styles.subText}>{game.hours} hours played</Text>
      <View style={[styles.badge, { backgroundColor: getStatusColor(game.status), alignSelf: 'flex-start', marginTop: 10 }]}><Text style={styles.badgeText}>{game.status}</Text></View>
      <Text style={styles.label}>Your Rating</Text>
      <View style={styles.row}>
        {ratingNumbers.map((number) => (
          <TouchableOpacity key={number} accessibilityRole='button' accessibilityLabel={`Rate ${number} out of 5`} onPress={() => onUpdateGame(gameId, { rating: number })}>
            <Text style={styles.star}>{number <= game.rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.subText}>{game.rating === 0 ? 'Not rated yet' : `You rated this ${game.rating}/5`}</Text>
      <Text style={styles.label}>Story Status</Text>
      <View style={styles.row}>
        {statusOptions.map((option) => (
          <TouchableOpacity key={option} accessibilityRole='button' style={[styles.chip, game.status === option ? styles.chipActive : null]} onPress={() => onUpdateGame(gameId, { status: option })}>
            <Text style={game.status === option ? styles.chipTextActive : styles.chipText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity accessibilityRole='button' style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('AddGame', { gameId })}>
        <Text style={styles.buttonText}>Edit Game Details</Text>
      </TouchableOpacity>
      <TouchableOpacity accessibilityRole='button' style={[styles.button, styles.dangerButton]} onPress={removeGame}>
        <Text style={styles.buttonText}>Remove from Collection</Text>
      </TouchableOpacity>
    </View>
  );
}
