import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppNavigator from "../Navigators/AppNavigator";

export default class RootScreen extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <AppNavigator/>
            </View>
        );
    }
}
