import React, { Component } from 'react';
import { connect } from 'react-redux';
import TrafficCard from '../components/TrafficCard';
import { latestTrafficData } from '../mapSelectors';
import { fetchTraffic } from '../mapActionCreators';
import { reduxActionStream } from '../../appConfig/reduxMiddlewares/reduxActionStream';
import R from 'ramda';

@connect(
	(state, props) => ({
		trafficData: latestTrafficData(state, props)
	})
)
export default class TrafficCardContainer extends Component {
	constructor(props) {
		super(props);
		// const {latestTraffic} = props;
		this.state = {
			isFetching: true
		};

	}

	componentWillMount() {
		const {route, dispatch} = this.props;
		// dispatch(fetchTrafficData(route));
		fetchTraffic(route)
			.then(data => {
				this.setState({isFetching: false})


			})

		




	}


	render() {
		return (
			<TrafficCard {...this.props}>
			</TrafficCard>
			);
	}
}
