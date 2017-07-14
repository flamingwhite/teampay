import React, { Component } from 'react';
import TrafficCardContainer from './containers/TrafficCardContainer';
import { Container, Content, Text, Button } from 'native-base';
import navbarButton from '../decorators/navbarButton';
import {getIcon} from '../icons';

@navbarButton({
	leftButtons: [{
		id: 'back',
		get icon() {
			return getIcon('ios-arrow-back')
		}
	}]
})
export default class RouteTrafficDetailScreen extends Component {

	constructor(props) {
		super(props);
		props.navButtonClick('back').subscribe(a => {
			console.log('click back');
			props.navigator.dismissModal();
		})
	}


	render() {
		const { route } = this.props;
		return (
			<Container>
				<Content>
					<TrafficCardContainer route={route}>
					</TrafficCardContainer>
				</Content>
			</Container>
		)


	}
}