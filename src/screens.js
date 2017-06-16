import {
	Navigation
} from 'react-native-navigation';

import TodoMainScreen from './todoApp/TodoMainScreen'
import TestScreen from './testApp';
import TodoDetailScreen from './todoApp/TodoDetailScreen';
import MapMainScreen from './mapApp/MapMainScreen';
import RouteInputScreen from './mapApp/RouteInputScreen';
import LocationMainScreen from './locationApp/locationMainScreen';
import LocationInputScreen from './locationApp/locationInputScreen';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
	Navigation.registerComponent('todoMainScreen', () => TodoMainScreen, store, Provider);
	Navigation.registerComponent('testScreen', () => TestScreen, store, Provider);
	Navigation.registerComponent('todoDetailScreen', () => TodoDetailScreen, store, Provider);
	Navigation.registerComponent('mapMainScreen', () => MapMainScreen, store, Provider);
	Navigation.registerComponent('routeInputScreen', () => RouteInputScreen, store, Provider);
	Navigation.registerComponent('locationMainScreen', () => LocationMainScreen, store, Provider);
	Navigation.registerComponent('locationInputScreen', () => LocationInputScreen, store, Provider);
}