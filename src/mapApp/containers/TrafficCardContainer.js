import React, {Component} from 'react';
import {connect} from 'react-redux';
import TrafficCard from '../components/TrafficCard';
import {latestTrafficData} from '../mapSelectors';
import {fetchTrafficData} from '../mapActionCreators';
import {reduxActionStream} from '../../appConfig/reduxMiddlewares/reduxActionStream';

@connect(
	(state, props) => ({
		latestTraffic: latestTrafficData(state, props)
	})
)
export default class TrafficCardContainer extends Component {
	constructor(props) {
		super(props);
		const { latestTraffic } = props;
		this.state = {
			loading: true
		};

	}

	componentWillMount() {
		const { route, dispatch } = this.props;
		dispatch(fetchTrafficData(route));

		reduxActionStream.subscribe(a => {
			console.log('wassss listen action', a);
		})
		
	}

	render() {
		return (
			<TrafficCard>
			</TrafficCard>
		);
	}
} 