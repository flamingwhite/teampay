import React, { Component } from 'react';
import PropTypes from 'prop-types';
import navbarButton from '../decorators/navbarButton';
import {getIcon} from '../icons';
import {GoogleAddressPicker} from '../googleAddressPicker'


@navbarButton({
	leftButtons: [{
		id: 'back',
		get icon() {
			return getIcon('ios-arrow-back')
		}
	}]
})
class AddressPickScreen extends Component {
	constructor(props) {
		super(props);
		let { onCancel, navButtonClick } = props;
		navButtonClick('back').subscribe(onCancel);
	}

	render() {
		return <GoogleAddressPicker {...this.props} />

	}

}


export default AddressPickScreen;