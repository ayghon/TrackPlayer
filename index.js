import 'react-native-gesture-handler';
import { App } from './src/App';
import { AppRegistry } from 'react-native';
import { PlaybackService } from './src/services';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
