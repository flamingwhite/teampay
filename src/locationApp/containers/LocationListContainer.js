import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationList from '../components/LocationList';
import PropTypes from 'prop-types';
import { visibileLocationSelector } from '../locationSelectors';


@connect(
	state => ({
		locations: visibileLocationSelector(state)
	})
)
class LocationListContainer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		
		let { locations, onLocationPress } = this.props;
		return (
			<LocationList locations={locations} onLocationPress={onLocationPress} />
		)
		
	}

}

LocationListContainer.propTypes = {
	locations: PropTypes.array,
	onLocationPress: PropTypes.func
};

export default LocationListContainer;