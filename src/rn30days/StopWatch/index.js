import React, { Component } from 'react';
import {Container, Content, Text, Button} from 'native-base';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import R from 'ramda';


const displayTicks = ticks => {
	const secs = Math.floor(ticks / 100);
	const minutes = Math.floor(secs / 60);
	return `${minutes}: ${secs%60} : ${ticks%100}`;
}

const styles = {
	mainWatch: {
		font: 30,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center'
	},
	watchControl: {
		backgroundColor: 'lightgray',
		height: 150,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'

	},
	controlBtn: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"

	},
	recordPanel: {
		flex: 1
	},
	bottom: {
		backgroundColor: 'lightgray',
		flex:4
	},
	buttons: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		display: 'flex',
		alignItems: 'center'
	},
	functionButton: {
		backgroundColor: 'white',
		color: 'red',
		borderRadius: 50,
		height: 100,
		width: 100,


	},
	startButton: {
		...this.functionButton,
		color: 'green'
	}
}

const WatchFace = ({ ticks }) => (
	<View style={styles.mainWatch}>
		<Text style={{ fontSize: 50 }}>{displayTicks(ticks)}</Text>
	</View>
);

const ControlButton = ({ onPress, color, text, visible})  => (
	<TouchableOpacity style={styles.controlBtn} onPress={onPress}>
		<Text style={{color}}>{text}</Text>
	</TouchableOpacity>
)


const ControlPanel =({start, stop, reset, tap, init, running}) => (
	<View style={styles.watchControl}>
		{ init && <ControlButton text="Idle" color="red"/>}
		{ running && <ControlButton onPress={tap} text="Tap" color="gray"/>}
		{ !init && !running && <ControlButton onPress={reset} text="Reset" color="red"/>}
		{ !running && <ControlButton onPress={start} text="Start" color="green"/>}
		{ running && <ControlButton onPress={stop} text="Stop" color="red"/>}
	</View>
)

const RecordPanel = ({taps = []}) => (
	<Content>
		{ taps.map(t => <Text>{displayTicks(t)}</Text>) }
	</Content>
)

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
		this.setState({ ...this.initState });

	}
	tap() {
		const {taps, ticks} = this.state;
		const newTap = ticks - taps.reduce((acc, cur) => acc + cur, 0);
		this.setState({
			taps: taps.concat(newTap)
		});
	}


	render() {
		const {start, stop, tap, reset} = this;
		const {ticks, taps, init, running} = this.state;
		return (
			<Container>
				<WatchFace ticks={ticks} />
				<ControlPanel {...{start, stop, tap, reset, init, running}} />
				<RecordPanel {...{taps}}/>
			</Container>

		);
	}
}
