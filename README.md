# MCO1: App Interface Prototype — Video Game Collection & Backlog Tracker

Offline prototype. Hardcoded starting data, no APIs, no storage (data resets when the app reloads).

## Setup (same steps as the Setup Guide + App Navigation lessons)
1. npx create-expo-app GameTracker --template blank
2. cd GameTracker
3. npm install @react-navigation/native @react-navigation/native-stack
4. npx expo install react-native-screens react-native-safe-area-context
5. Replace App.js, copy the assets/covers folder into your project's assets folder, and copy in: data.js, globalStyles.js, HomeScreen.js, AddGameScreen.js, DetailsScreen.js
6. npx expo start  (scan the QR code with Expo Go)

## Files
- App.js: useState holds the game list + Stack Navigator (3 screens)
- data.js: hardcoded games, status list, helper functions (if/else, for loop)
- globalStyles.js: one shared StyleSheet (Flexbox only)
- HomeScreen.js: summary counts, filter buttons, FlatList of games
- AddGameScreen.js: TextInput form, status + star rating pickers
- DetailsScreen.js: change rating/status, remove game (route.params)

## Lesson concepts used
View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Flexbox,
useState, onChangeText, onPress, navigation.navigate / goBack, route.params,
const/let, arrow functions, template literals, destructuring, spread (...),
.map() / .filter(), if/else, for loop, import/export.
