import {
	convertArrayToMirrorAction
} from '../lib/simpleReduxTool';
import PushNotification from 'react-native-push-notification';


const syncActions = convertArrayToMirrorAction([
	'APP_STATE_CHANGE'
]);

const AppStateActions = syncActions;

const appStateChange = nextState => {
	if (nextState == 'background') {

		setInterval(() => {
			PushNotification.localNotificationSchedule({

				/* iOS and Android properties */
				title: "I like Miao", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
				message: "She is pretty", // (required)
				playSound: false, // (optional) default: true
				soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
				number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
				repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
				actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
				date: new Date(Date.now() + 10000)
			});

		}, 1000000);

	}
	return {
		type: AppStateActions.APP_STATE_CHANGE,
		nextState: {
			state: nextState,
			time: new Date()
		}
	}
};


export {
	AppStateActions,
	appStateChange
};