import React, { Component } from 'react';
import { AlertIOS } from 'react-native';
// import {Observable} from 'rxjs/Observable';
import Rx from 'rxjs/Rx'

console.log('RXXXX', Rx);


const navbarButton = config => InnerCmp => {
	let defaultConfig = {
		title: 'Edit',
		id: 'edit',
		buttonColor: 'black',
		buttonFontSize: 16,
	}

	let buttonConfig = {
		...defaultConfig,
		...config
	};


	class Wrapper extends Component {
		static navigatorButtons = {
			rightButtons: [buttonConfig]
		};
		constructor(props) {
			super(props);
			console.log('bar wrapper con');

			this.navClickSub = new Rx.Subject();

			this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
			this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		}
		onNavigatorEvent(event) {
			console.log('icon pressed', event);
			if (event.type == 'NavBarButtonPress' && event.id == buttonConfig.id) {
				this.navClickSub.next(event);
			}
		}
		render() {
			return (
				<InnerCmp navClickSub={this.navClickSub} { ...this.props } />
				);
		}
	}

	return Wrapper;

}

export default navbarButton;