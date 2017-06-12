import React, { Component } from 'react';
import FooterLink from '../../genericCmps/FooterLink';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


@connect(state => ({
	visibilityFilter: state.todoChunk.visibilityFilter
}))
class TodoFilterTab extends Component{
	constructor(props) {
		super(props);
	}
	render() {
		let { filterKey, dispatch, visibilityFilter } = this.props;
		return <FooterLink {...this.props} active={visibilityFilter == filterKey} onClick={evt => dispatch({
			type: 'SET_VISIBILITY_FILTER',
			filterKey
		})}></FooterLink>
	}

}

TodoFilterTab.propTypes = {
	filterKey: PropTypes.string,
	dispatch: PropTypes.func,
	visibilityFilter: PropTypes.string,
	onClick:PropTypes.func
}

export default TodoFilterTab;


