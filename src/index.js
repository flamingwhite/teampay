// import React, { Component } from 'react';
// import { connect, Provider } from 'react-redux';

// import store from './appConfig/reduxStore';
// console.log('store', store);

// import TodoApp from './todoApp';

// import { StyleSheet, Text, View } from 'react-native';
// import { Container } from 'native-base';


// export default class App extends Component {
// 	render() {
// 		console.log('hello world app');
// 		return (
// 			<Provider store={ store }>
// 				<Container style={{ flex: 1 }}>
// 					<TodoApp/>
// 				</Container>
// 			</Provider>
// 			);
// 	}
// }
// ;


import React, {
	Component
} from 'react';
import {
	Navigation
} from 'react-native-navigation';
import {
	Provider
} from 'react-redux';
import {
	registerScreens
} from './screens';

import Icon from 'react-native-vector-icons/Ionicons';

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

let settingsOutlineIcon, navigationOutline, homeIconOutline,
	settingsIcon, navigationIcon, homeIcon;

const populateIcons = function () {
	return new Promise(function (resolve, reject) {
		Promise.all(
			[
				Icon.getImageSource('ios-settings-outline', 30),
				Icon.getImageSource('ios-navigate-outline', 30),
				Icon.getImageSource('ios-home-outline', 30),
				Icon.getImageSource('ios-settings', 30),
				Icon.getImageSource('ios-navigate', 30),
				Icon.getImageSource('ios-home', 30),
				
			]
		).then((values) => {
			[settingsOutlineIcon, navigationOutline, homeIconOutline, settingsIcon, navigationIcon, homeIcon] = values;
			resolve(true);
		}).catch((error) => {
			console.log(error);
			reject(error);
		}).done();
	});
};

const loadingIconAndStart = () => populateIcons().then(() => startApp());

const startApp = () => {
	// Navigation.startSingleScreenApp({
	// 	screen: {
	// 		screen: 'todoScreen',
	// 		title: 'Todo',
	// 		navigatorStyle
	// 	}
	// });
	Navigation.startTabBasedApp({
		tabs: [{
				label: 'One', // tab label as appears under the icon in iOS (optional)
				screen: 'todoMainScreen', // unique ID registered with Navigation.registerScreen
				title: 'TODOScreen One', // title of the screen as appears in the nav bar (optional)
				icon: homeIconOutline,
				selectedIcon: homeIcon
			},
			{
				label: 'MapDemp',
				screen: 'mapMainScreen',
				title: 'MapsToTest',
				icon: navigationOutline,
				selectIcon: navigationIcon
			},
			{
				label: 'Locations',
				screen: 'locationMainScreen',
				title: 'My Locations',
				icon: settingsOutlineIcon,
				selectIcon: settingsIcon
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

export default loadingIconAndStart;