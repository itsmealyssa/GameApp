import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { searchCatalogGames } from './gameCatalog';
import { styles } from './globalStyles';
import GameCover from './GameCover';

export default function GameSearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length < 2) {
      setResults([]);
      setErrorMessage('');
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      setLoading(true);
      setErrorMessage('');
      searchCatalogGames(trimmedQuery, controller.signal)
        .then(setResults)
        .catch((error) => {
          if (error.name !== 'AbortError') {
            setResults([]);
            setErrorMessage(error.message || 'Could not search the catalog.');
          }
        })
        .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    }, 350);
    return () => { clearTimeout(timeoutId); controller.abort(); };
  }, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Game</Text>
      <Text style={styles.subText}>Search the RAWG catalog, then review before adding.</Text>
      <TextInput accessibilityLabel='Search games online' autoCapitalize='none' autoCorrect={false} placeholder='Search game titles' placeholderTextColor='#64748b' returnKeyType='search' style={[styles.input, styles.searchInput]} value={query} onChangeText={setQuery} />
      <Text style={styles.helperText}>Catalog data by RAWG. Add EXPO_PUBLIC_RAWG_API_KEY to .env.</Text>
      {loading ? <View style={styles.loadingRow}><ActivityIndicator color='#1683ff' /><Text style={styles.subText}>Searching…</Text></View> : null}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {!loading && !errorMessage && query.trim().length < 2 ? <Text style={styles.emptyText}>Enter at least two characters to search.</Text> : null}
      {!loading && !errorMessage && query.trim().length >= 2 && results.length === 0 ? <Text style={styles.emptyText}>No matches found.</Text> : null}
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={results.length ? styles.listContent : undefined}
        renderItem={({ item }) => (
          <View style={styles.catalogCard}>
            <GameCover game={item} />
            <View style={styles.cardInfo}>
              <Text style={styles.text} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.subText}>{item.platform}{item.releaseDate ? ` · ${item.releaseDate.slice(0, 4)}` : ''}</Text>
              <TouchableOpacity accessibilityRole='button' style={styles.smallButton} onPress={() => navigation.navigate('AddGame', { gameSeed: item })}>
                <Text style={styles.buttonText}>Review and add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
