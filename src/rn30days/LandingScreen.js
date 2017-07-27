import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

@connect()
export default class LandingScreen extends Component {
	constructor(props) {
		super(props);

		this._onDayClick = this._onDayClick.bind(this);
		

		this.state = {
			days: [{
				key: 1,
				title: 'StopWatch',
				screen: 'stopWatchScreen',
				color: 'red',
				hideNav: false
			}, {
				key: 2,
				title: 'Weather App',
				screen: 'weatherScreen',
				color: 'yellow',
				hideNav: false
			}]
		}

	}

	_onDayClick(day) {
		const {navigator} = this.props;
		const {title, screen} = day;
		navigator.push({
			screen,
			title,
		});


	}

	render() {
		const {_onDayClick} = this;
		const renderDay = day => (
			<TouchableOpacity onPress={() => _onDayClick(day)}>
				<Text>
					{ day.title }
				</Text>
			</TouchableOpacity>
		)
		return (
			<Container>
				<Content>
					{ this.state.days.map(renderDay) }
					<Button>
						<Text>Just here</Text>
					</Button>
				</Content>
			</Container>

			);
	}
}
