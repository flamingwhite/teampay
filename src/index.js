import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';

import store from './appConfig/reduxStore';
console.log('store', store);

import TodoApp from './todoApp';

import { StyleSheet, Text, View } from 'react-native';
import { Container } from 'native-base';


// export default () => console.log('app');
// export default class App extends Component {
//   render() {
// 	  console.log('hello world app');
//     return (
// 			<View>
// 				<Text>
// 					This is our main app.jsx
// 				</Text>
// 			</View>
//     );
//   }
// };
export default class App extends Component {
	render() {
		console.log('hello world app');
		return (
			<Provider store={ store }>
				<Container style={{ flex: 1 }}>
					<TodoApp/>
				</Container>
			</Provider>
			);
	}
}
;