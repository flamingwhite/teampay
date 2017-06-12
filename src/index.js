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
				title: 'TODOScreen One' // title of the screen as appears in the nav bar (optional)
			},
			{
				label: 'Two',
				screen: 'testScreen',
				title: 'Screen Two'
			}
		],
		tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
			tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected)
			tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected)
			tabBarBackgroundColor: '#551A8B' // optional, change the background color of the tab bar
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

export default startApp;