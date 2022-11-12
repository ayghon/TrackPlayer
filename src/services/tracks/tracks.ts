import { Track } from 'react-native-track-player';

const ARTWORK_BASE_URL = 'https://source.unsplash.com/random/400?animals&sig=';
const TRACK_BASE_URL = 'https://bigsoundbank.com/UPLOAD/mp3/';

export const tracks: Track[] = Array.from(Array(15)).map((_, index) => ({
  artwork: `${ARTWORK_BASE_URL}${index}`,
  url: `${TRACK_BASE_URL}${(index + 1).toString().padStart(4, '0')}.mp3`,
  title: (index + 1).toString().padStart(4, '0'),
  artist: 'bigsoundbank',
  album: 'free sound',
  date: new Date().toISOString(),
  duration: 26
}));
