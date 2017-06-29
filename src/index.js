

import {
	Navigation
} from 'react-native-navigation';
import {
	Provider
} from 'react-redux';
import {
	registerScreens
} from './screens';

import {loadIcons, getIcon} from './icons';
import store from './appConfig/reduxStore';

registerScreens(store, Provider);

const navigatorStyle = {
	navBarTranslucent: true,
	drawUnderNavBar: true,
	navBarTextColor: 'white',
	navBarButtonColor: 'white',
	statusBarTextColorScheme: 'light',
	drawUnderTabBar: true
};


function setup() {
    var tasks = [
        // other async tasks/promises
		loadIcons([
			'ios-settings-outline',
			'ios-navigation-outline',
			'ios-home-outline',
			'ios-settings',
			'ios-navigate',
			'ios-home',
			'ios-add',
			'ios-arrow-back',
			'ios-close'
		]),
    ];

    Promise.all(tasks)
        .then(() => new startApp());
}


const startApp = () => {
	Navigation.startTabBasedApp({
		tabs: [
			{
				label: 'One', // tab label as appears under the icon in iOS (optional)
				screen: 'todoMainScreen', // unique ID registered with Navigation.registerScreen
				title: 'TODOScreen One', // title of the screen as appears in the nav bar (optional)
				icon: getIcon('ios-home-outline'),
				selectedIcon: getIcon('ios-home')
			},
			{
				label: 'MapDemp',
				screen: 'mapMainScreen',
				title: 'MapsToTest',
				icon: getIcon('ios-navigate'),
				selectIcon: getIcon('ios-navigate')
			},
			{
				label: 'Locations',
				screen: 'locationMainScreen',
				title: 'My Locations',
				icon: getIcon('ios-settings-outline'),
				selectIcon: getIcon('ios-settings')
			}
		],
		tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
			tabBarButtonColor: 'gray', // optional, change the color of the tab icons and text (also unselected)
			tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected)
			tabBarBackgroundColor: 'white' // optional, change the background color of the tab bar
		},
		appStyle: {
			orientation: 'portrait' // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
		},
		drawer: { // optional, add this if you want a side menu drawer in your app
			left: { // optional, define if you want a drawer from the left
				screen: 'todoDetailScreen', // unique ID registered with Navigation.registerScreen
				passProps: {} // simple serializable object that will pass as props to all top screens (optional)
			},
			right: { // optional, define if you want a drawer from the right
				screen: 'todoDetailScreen', // unique ID registered with Navigation.registerScreen
				passProps: {} // simple serializable object that will pass as props to all top screens (optional)
			},
			disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
		},
		passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
		animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
	});

}

export default setup;