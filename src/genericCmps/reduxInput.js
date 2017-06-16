import React from 'react';
import { Input, Text, View } from 'native-base';
import PropTypes from 'prop-types';

const ReduxInput = (props) => {
	const {input, meta, ...inputProps} = props;

	const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine', 'submitting', 'touched', 'valid', 'visited'];

	let { onChange, ...rest } = input;
	console.log(props)

	return (
		<View>
			<Input
				{...inputProps}
				onChangeText={onChange}
				{...rest}
			/>
			<Text>The { input.name} input is:</Text>
			{
				formStates.filter((state) => meta[state]).map(state => <Text key={state}> - { state }</Text>)
			}
		</View>
	)
}

ReduxInput.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object
}

export default ReduxInput;