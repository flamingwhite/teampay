import {
	Navigation
} from 'react-native-navigation';

import TodoMainScreen from './todoApp/TodoMainScreen'
import TestScreen from './testApp';
import TodoDetailScreen from './todoApp/TodoDetailScreen';
import MapMainScreen from './mapApp/MapMainScreen';
import RouteInputScreen from './mapApp/RouteInputScreen';
import RouteEditScreen from './mapApp/RouteEditScreen';
import RouteTrafficDetailScreen from './mapApp/RouteTrafficDetailScreen';
import LocationMainScreen from './locationApp/LocationMainScreen';
import LocationInputScreen from './locationApp/LocationInputScreen';
import LocationEditScreen from './locationApp/LocationEditScreen';
import AddressPickScreen from './addressApp/AddressPickScreen';
import R from 'ramda';

//RN30 days screens

import LandingScreen from './rn30days/LandingScreen';
import StopWatchScreen from './rn30days/StopWatch';


// register all screens of the app (including internal ones)

const screens = {
	todoMainScreen: TodoMainScreen,
	testScreen: TestScreen,
	todoDetailScreen: TodoDetailScreen,
	mapMainScreen: MapMainScreen,
	routeInputScreen: RouteInputScreen,
	routeEditScreen: RouteEditScreen,
	routeTrafficDetailScreen: RouteTrafficDetailScreen,
	locationMainScreen: LocationMainScreen,
	locationInputScreen: LocationInputScreen,
	locationEditScreen: LocationEditScreen,
	addressPickScreen: AddressPickScreen,
	landingScreen: LandingScreen,
	stopWatchScreen: StopWatchScreen
};

export function registerScreens(store, Provider) {

	const register = ([name, component]) => Navigation.registerComponent(name, () => component, store, Provider);

	Object.entries(screens).map(register);

}