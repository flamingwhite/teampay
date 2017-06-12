import { Navigation } from 'react-native-navigation';

import TodoMainScreen from './todoApp/todoMainScreen';
import TestScreen from './testApp';
import todoDetailScreen from './todoApp/todoDetailScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('todoMainScreen', () => TodoMainScreen, store, Provider);
  Navigation.registerComponent('testScreen', () => TestScreen, store, Provider);
  Navigation.registerComponent('todoDetailScreen', () => todoDetailScreen, store, Provider);
};