import React from 'react';
import { Button, Badge, Icon, Text, FooterTab } from 'native-base';
import { string, boolean, func } from 'prop-types';

const FooterLink = props => {

	let { text, badge, icon, active, onClick} = props;
	return (

		<FooterTab>
			<Button {...{ active }} onPress={onClick}>
				{
					badge && <Badge><Text>{badge}</Text></Badge>
				}
				{
					icon && <Icon name={icon}></Icon>
				}
				<Text>{text}</Text>
			</Button>
		</FooterTab>
	);
}

FooterLink.propTypes = {
	text: string,
	badge: string,
	icon: string,
	active: boolean,
	onClick: func
};

export default FooterLink;


