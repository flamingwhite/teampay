import React, {
	Component
} from 'react';
import Rx from 'rxjs/Rx'
import PropTypes from 'prop-types';


const navbarButton = buttonConfig => InnerCmp => {
	

	class Wrapper extends Component {
		static navigatorButtons = buttonConfig;
		constructor(props) {
			super(props);
			console.log('bar wrapper con');

			this.navigationEvents = new Rx.Subject();

			this.navButtonClick = id => this.navigationEvents.filter(e => e.id == id);

			this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
		}
		onNavigatorEvent(event) {
			console.log('icon pressed', event);
			this.navigationEvents.next(event);
		}
		render() {
			return (<InnerCmp navigator={this.props.navigator}
				navigationEvents={this.navigationEvents} { ...this.props } navButtonClick={this.navButtonClick}/>
			);
		}
	}

	Wrapper.propTypes = {
		navigator: PropTypes.object
	}

	return Wrapper;

}

export default navbarButton;