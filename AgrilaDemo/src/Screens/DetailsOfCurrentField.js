import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import AppNavigator from "../Navigators/AppNavigator";
import axios from "axios";

export default class DetailsOfCurrentFields extends Component {
    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    fieldData = async (token, url) => {
        return axios.get(
            url,
            {
                headers: {
                    Accept: "applications/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };

    componentWillMount() {
        const id = JSON.stringify(this.props.navigation.getParam('itemID'));
        const url = `https://rila.eu-gb.mybluemix.net/app/agro/field/info/${id}`;
        this._retrieveData().then(token => {
                this.fieldData(token, url)
                    .then(responseData => {
                        console.log(responseData)
                        this.setState({
                            data: responseData,
                            isLoading: false
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        );

    }

    render() {

        const {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <Text> {JSON.stringify(navigation.getParam('itemID'))} </Text>
                {/*
                {this.state.data && <Text>{this.state.data.description}</Text>}
*/}
            </View>
        );
    }
}
