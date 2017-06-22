import React, { Component } from 'react';
import Rx from 'rxjs/Rx'
import PropTypes from 'prop-types';


const navbarButton = (...config) => InnerCmp => {
	let [right, left] = config;
	let defaultConfig = {
		title: 'Edit',
		id: 'edit',
		buttonColor: 'black',
		buttonFontSize: 16,
	}

	let leftConfig, rightConfig;

	rightConfig = {
		...defaultConfig,
		...right
	};

	let navButtons = {
		rightButtons: [rightConfig]
	};

	if(left) { 
		leftConfig = {
			...defaultConfig,
			...left
		};
		navButtons.leftButtons = [leftConfig];
	}



	class Wrapper extends Component {
		static navigatorButtons = navButtons;
		constructor(props) {
			super(props);
			console.log('bar wrapper con');

			this.navigationEvents = new Rx.Subject();
			this.leftClick = this.navigationEvents.filter(e => e.id == (leftConfig || {}).id)
			this.rightClick = this.navigationEvents.filter(e => e.id == (rightConfig || {}).id)

			this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		}
		onNavigatorEvent(event) {
			console.log('icon pressed', event);
			this.navigationEvents.next(event);
		}
		render() {
			return (
				<InnerCmp navigationEvents={this.navigationEvents} { ...this.props } leftClick={this.leftClick} rightClick={this.rightClick}/>
				);
		}
	}

	Wrapper.propTypes = {
		navigator: PropTypes.object
	}

	return Wrapper;

}

export default navbarButton;