import React from 'react';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types';


// class RouteTimePicker extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			date: '3:04 pm'
// 		}
// 	}
// 	render() {
// 		return ( 
// 			<DatePicker
// 				mode="time"
// 				placeholder="Select Time"
// 				date={this.state.date}
// 				maxDate="8:00 pm"
// 				format='h:mm a'
// 				confirmBtnText="OK"
// 				cancelBtnText="Cancel"
// 				onDateChange={date => {
// 					console.log('date changed', date);
// 					this.setState({date})
// 				}}
			
// 			/>
// 		)
// 	}

// }

const RouteTimePicker = ({ date, maxDate=null, onDateChange }) => (
		<DatePicker
			mode="time"
			placeholder="Select Time"
			date={date}
			showIcon={false}
			customStyles={{
				dateInput: {
					borderWidth: 0,
					borderBottomWidth:1,
					width:500,
				},
				placeholderText: {
				},
				dateTouchBody: {
					
				}
			}}
			maxDate={maxDate}
			format='h:mm a'
			confirmBtnText="OK"
			cancelBtnText="Cancel"
			onDateChange={date => {
				console.log('date changed', date);
				onDateChange(date)
			}}
		
		/>
	
)

RouteTimePicker.propTypes = {
	date: PropTypes.string,
	maxDate: PropTypes.string,
	onDateChange: PropTypes.func
}

export default RouteTimePicker;

