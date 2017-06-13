import { Navigation } from 'react-native-navigation';

import TodoMainScreen from './todoApp/TodoMainScreen'
import TestScreen from './testApp';
import TodoDetailScreen from './todoApp/TodoDetailScreen';
import MapMainScreen from './mapApp/MapMainScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('todoMainScreen', () => TodoMainScreen, store, Provider);
  Navigation.registerComponent('testScreen', () => TestScreen, store, Provider);
  Navigation.registerComponent('todoDetailScreen', () => TodoDetailScreen, store, Provider);
  Navigation.registerComponent('mapMainScreen', () => MapMainScreen, store, Provider);
}