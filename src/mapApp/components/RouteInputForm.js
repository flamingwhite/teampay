import React, { Component } from 'react';
import { Container, Text, Content, Input, InputGroup } from 'native-base';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import GooglePlaceInput from './GooglePlaceInput';
import RouteTimePicker from './RouteTimePicker';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import ReduxInput from '../../genericCmps/reduxInput';
import { Button } from 'native-base';
import { fetchDirection } from '../mapActionCreators';


const renderTimePicker = ({input: {onChange, value}}) => <RouteTimePicker onDateChange={onChange} date={value} />

const renderGoogleInput = ({ input: { onChange } }) => <GooglePlaceInput onSelect={onChange}/>


@connect(
	state => ({
		routeForm: state.mapChunk.defaultRouteConfig
	})
)
@reduxForm({
	form:'routeInput'
})
class RouteInputScreen extends Component {
	render() {
		const {handleSubmit, dispatch} = this.props
		const mySubmit = values => {
			console.log('other argus in SUBMIT', arguments);
			console.log('submit values', values);
			let { fromLocation, toLocation } = values;
			let placeOne = fromLocation.place_id;
			let placeTwo = toLocation.place_id;
			dispatch(fetchDirection(placeOne, placeTwo));
			
		}

		return (
			<Container>
				<Content>
					<Field
						name="fromLocation"
						component={renderGoogleInput}
					/>
					<Field
						name="toLocation"
						component={renderGoogleInput}
					/>
					<Field
						name="startTime"
						component={renderTimePicker}
					/>
					<Field
						name="endTime"
						component={renderTimePicker}
					/>
					<Field
						name="testInput"
						component={(p) => <ReduxInput borderType="underline" {...p}/>}
					/>
					<Button onPress={handleSubmit(mySubmit)}>
						<Text>Create</Text>
					</Button>
				</Content>
			</Container>

			);
	}
}

RouteInputScreen.proptypes = {
	startTime: PropTypes.string,
	endTime: PropTypes.string,
	routeForm: PropTypes.object,
	handleSubmit: PropTypes.func
}

export default RouteInputScreen;