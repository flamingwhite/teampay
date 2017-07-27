import React, { Component } from 'react';
import {Container, Content, Text, Button} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import R from 'ramda';


const displayTicks = ticks => {
	const secs = Math.floor(ticks / 100);
	const minutes = Math.floor(secs / 60);
	return `${minutes}: ${secs%60} : ${ticks%100}`;
}

@connect()
export default class StopWatchScreen extends Component {
	constructor(props) {
		super(props);
		this.start = this.start.bind(this);
		this.stop = this.stop.bind(this);
		this.reset = this.reset.bind(this);
		this.tap = this.tap.bind(this);

		this.timeoutTracker = null;	

		this.initState = {
			ticks: 0,
			taps: [],
			init: true,
			running: false
		}
		this.state = { ...this.initState };
		
	}

	start() {
		this.timeoutTracker = setInterval(() => {
			this.setState({
				ticks: this.state.ticks + 1
			})
		}, 10);

		this.setState({
			init: false,
			running: true,
		})
	}
	stop() {
		clearInterval(this.timeoutTracker);
		this.setState({
			running: false,
		})
	}
	reset() {
		this.setState({ ...this.initState, init: true, running: false });

	}
	tap() {
		const {taps, ticks} = this.state;
		const newTap = R.subtract(ticks)(R.pipe(
			R.last,
			R.defaultTo(0)
		)(taps));
		this.setState({
			taps: taps.concat(newTap)
		});
	}


	render() {
		const {start, stop, tap, reset} = this;
		const {ticks, taps, init, running} = this.state;
		const renderTimer = ticks => <Text>{displayTicks(ticks)}</Text>;
		const renderTaps = taps => taps.map(renderTimer)

		return (
			<Container>
				<Content>
					{renderTimer(ticks)}
					{renderTaps(taps)}
					{
						running &&
						<Button onPress={tap}>
							<Text>Tap</Text>
						</Button>
					}
					{
						!init && !running &&
						<Button onPress={reset}>
							<Text>Reset</Text>
						</Button>
					}
					{
						!running &&
						<Button onPress={start}>
							<Text>Start</Text>
						</Button>
					}
					{
						running &&
						<Button onPress={stop}>
							<Text>Stop</Text>
						</Button>
					}
				</Content>
			</Container>

		);
	}
}
