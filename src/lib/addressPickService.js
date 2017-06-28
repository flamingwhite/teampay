import {
	Navigation
} from 'react-native-navigation';
import defer from 'promise-defer';

console.log('navigation is', Navigation);

const showAddressPicker = (config = {}) => {

	let deferred = defer();

	let {
		passProps,
		title = 'Pick an Address'
	} = config;

	let onAddressSelect = data => {
		dismissModal();
		deferred.resolve(data)
	};
	let onCancel = data => {
		dismissModal();
		deferred.reject('Cancelled');
	};

	const dismissModal = () => Navigation.dismissModal({
		animationType:'slide-down'
	})


	Navigation.showModal({
		screen: 'addressPickScreen',
		title,
		passProps: {
			onAddressSelect,
			onCancel,
			...passProps,
			initValue: config.initValue
		}
	})

	return deferred.promise;

}

export { showAddressPicker };