import React, { Component } from 'react';
import { Container, Header, Text, Title, Content, Footer, FooterTab, Button, Icon } from 'native-base';
export default class AnatomyExample extends Component {
    render() {
        return (
            <Container> 
                <Header>
                    <Title>Header</Title>
                </Header>

                <Content>
                    <Text>What's up testapp</Text>
                </Content>

                <Footer>
                    <FooterTab>
                        <Button transparent>
                            <Icon name='ios-call' />
                        </Button>  
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}