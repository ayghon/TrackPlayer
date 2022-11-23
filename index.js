import 'react-native-gesture-handler';
import { App } from './src/App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { playbackService } from './src/services';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => playbackService);
