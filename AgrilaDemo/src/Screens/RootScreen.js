import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AppNavigator from "../AppNavigator";

export default class RootScreen extends Component {
    render() {
        console.log('test')
        return (
            <View style={styles.container}>
                <AppNavigator/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
