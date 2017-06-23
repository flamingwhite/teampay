import React, {Component} from 'react';
import PropTypes from 'prop-types';

const controlNavTabs = config => InnerCmp => {


	class Wrapper extends Component {
		constructor(props) {
			super(props);
			this.toggleNavBar = this.toggleNavBar.bind(this);
			this.toggleTabs = this.toggleTabs.bind(this);
			this.toggleNavTabs = this.toggleNavTabs.bind(this);
		}
		toggleNavBar(mode) {
			let shown = mode ? 'shown' : 'hidden';
			this.props.navigator.toggleNavBar({
				to: shown,
				animated: true
			});
		}
		toggleTabs(mode) {
			let shown = mode ? 'shown' : 'hidden';
			this.props.navigator.toggleTabs({
				to: shown,
				animated: true
			});
		}
		toggleNavTabs(mode) {
			this.toggleNavBar(mode);
			this.toggleTabs(mode);
		}
		render() {
			return(
				<InnerCmp
					navigator={this.props.navigator}	
					toggleNavTabs={this.toggleNavTabs}
					toggleNavBar={this.toggleNavBar}
					toggleTabs={this.toggleTabs}

				/>			
			);
		}

	}

	Wrapper.propTypes = {
		navigator: PropTypes.object
	};

	return Wrapper;
}

export default controlNavTabs;