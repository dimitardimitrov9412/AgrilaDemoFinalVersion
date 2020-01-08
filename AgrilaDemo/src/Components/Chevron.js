import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

// create a component
export default class Chevron extends Component {
    render() {
        return (
            <View style={styles.chevron}>
                <View style={styles.chevronMain}/>
                <View style={[styles.chevronTriangle, styles.chevronBottomRight]}/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    chevron: {
        width: 150,
        height: 50
    },
    chevronTriangle: {
        backgroundColor: 'transparent',
        borderTopWidth: 20,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 75,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'transparent',
        borderLeftColor: 'red',
    },
    chevronBottomRight: {
        position: 'absolute',
        bottom: -20,
        right: 0,
        transform: [
            {scaleY: -1}
        ]
    }
})
