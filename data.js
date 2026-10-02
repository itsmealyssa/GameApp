// data.js
// Hardcoded starting data for the prototype (no internet, no database).

// Local cover images use require('./path') (Image "source" prop)
export const initialGames = [
  { id: '1', title: 'Cyberpunk 2077', platform: 'PC', status: 'Completed', rating: 5, image: require('./assets/covers/cyberpunk2077.jpg') },
  { id: '2', title: 'Battlefield 6', platform: 'PS5', status: 'Playing', rating: 4, image: require('./assets/covers/battlefield6.jpg') },
  { id: '3', title: 'The Finals', platform: 'PC', status: 'Backlog', rating: 0, image: require('./assets/covers/thefinals.jpg') },
  { id: '4', title: 'Apex Legends', platform: 'PC', status: 'Playing', rating: 3, image: require('./assets/covers/apexlegends.jpg') },
];

// The 3 story completion statuses a game can have
export const statusOptions = ['Backlog', 'Playing', 'Completed'];

// Conditionals: pick a color based on the status
export function getStatusColor(status) {
  if (status === 'Completed') {
    return '#A6E3A1'; // green
  } else if (status === 'Playing') {
    return '#F9E2AF'; // yellow
  } else {
    return '#F38BA8'; // red (Backlog)
  }
}

// Loops: build a star string like "★★★☆☆" from a number rating
export function getStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars = stars + '★';
    } else {
      stars = stars + '☆';
    }
  }
  return stars;
}
