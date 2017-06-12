import React, { Component } from 'react';
import {  Footer, Button, Icon,  Text, FooterTab, Badge } from 'native-base';

class AppFooter extends Component {
	render() {
		return (
				<Footer>
					<FooterTab>
						<Button full>
							<Text>Footer</Text>
						</Button>
					</FooterTab>
					<FooterTab>
						<Button full>
							<Text>Footer</Text>
						</Button>
					</FooterTab>
					<FooterTab>
						<Button badge vertical>
							<Badge>
								<Text>2</Text>
							</Badge>
							<Icon name="apps" />
							<Text>Apps</Text>
						</Button>
					</FooterTab>
					<FooterTab>
						<Button active badge vertical>
							<Badge>
								<Text>51</Text>
							</Badge>
							<Icon active name="navigate" />
							<Text>Navigate</Text>
						</Button>
					</FooterTab>
				</Footer>
			);
	}
}

export default AppFooter;