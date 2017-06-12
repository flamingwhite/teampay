import React, { Component } from 'react';
import { Container, Button, Text, Header, Title, Content, Left, Right, Body, Icon } from 'native-base';


class AppHeader extends Component {
	render() {
		return (
				<Header>
					<Left>
						<Button transparent>
							<Icon name='menu'></Icon>
						</Button>
					</Left>
					<Body>
						<Title>Todo List</Title>
					</Body>
					<Right></Right>
				</Header>
		)
	}
}

export default AppHeader;