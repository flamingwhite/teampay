// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  * @flow
// //  */

// // import React, { Component } from 'react';
// // import { Provider } from 'react-redux';
// // import App from './src'
// // // let App = require('./app/App');
// // console.log(App);

// // import { AppRegistry, StyleSheet, View } from 'react-native';
// // import { Container, Text } from 'native-base';

// // export default class teampay extends Component {
// // 	render() {

// // 		return (
// // 			<Container>
// // 				<App style={ { flex: 1 } } />
// // 			</Container>
// // 			);
// // 	}
// // }

// // const styles = StyleSheet.create({
// // 	container: {
// // 		flex: 1,
// // 		justifyContent: 'center',
// // 		alignItems: 'center',
// // 		backgroundColor: '#F5FCFF'
// // 	},
// // 	welcome: {
// // 		fontSize: 20,
// // 		textAlign: 'center',
// // 		margin: 10
// // 	},
// // 	instructions: {
// // 		textAlign: 'center',
// // 		color: '#333333',
// // 		marginBottom: 5
// // 	}
// // });

// // AppRegistry.registerComponent('teampay', () => teampay);


// import { Navigation } from 'react-native-navigation';

// import { registerScreens } from './src/screens';

// registerScreens(); // this is where you register all of your app's screens

// // // start the app
// // Navigation.startTabBasedApp({
// //   tabs: [
// //     {
// //       label: 'One',
// //       screen: 'todoScreen', // this is a registered name for a screen
// //       title: 'Screen One'
// //     },
// //     {
// //       label: 'Two',
// //       screen: 'testScreen',
// //       title: 'Screen Two'
// //     }
// //   ]
// // });

// Navigation.startSingleScreenApp({
// 	screen: {
// 		screen: 'todoScreen',
// 		title: 'Todo'
// 	}
// })



import App from './src';

App();