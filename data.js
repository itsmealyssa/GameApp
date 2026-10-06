// ine an about sa game kun diin makikita an data san uyag
export const initialGames = [
  { id: '1', title: 'Cyberpunk 2077', platform: 'PC', status: 'Completed', rating: 5, hours: 65, image: require('./assets/covers/cyberpunk2077.jpg') },
  { id: '2', title: 'Battlefield 6', platform: 'PS5', status: 'Playing', rating: 4, hours: 45, image: require('./assets/covers/battlefield6.jpg') },
  { id: '3', title: 'The Finals', platform: 'PC', status: 'Backlog', rating: 0, hours: 0, image: require('./assets/covers/thefinals.jpg') },
  { id: '4', title: 'Apex Legends', platform: 'PC', status: 'Playing', rating: 3, hours: 60, image: require('./assets/covers/apexlegends.jpg') },
];

export const statusOptions = ['Backlog', 'Playing', 'Completed'];

export function getStatusColor(status) {
  if (status === 'Completed') {
    return '#A6E3A1';
  } else if (status === 'Playing') {
    return '#F9E2AF';
  } else {
    return '#F38BA8';
  }
}

export function getStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars += '★';
    } else {
      stars += '☆';
    }
  }
  return stars;
}

// ine naman an loop san uyag kun pera na ka oras para uyag
export function calculateTotalHours(gamesList) {
  let total = 0;
  for (let i = 0; i < gamesList.length; i++) {
    total += gamesList[i].hours || 0;
  }
  return total;
}
