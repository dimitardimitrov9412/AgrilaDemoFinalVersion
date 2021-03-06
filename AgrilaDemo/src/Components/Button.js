//import liraries
import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

// create a component
export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigateTo()}
            >
                <Text
                    style={[
                        styles.buttonText,
                        this.props.isUpperCase ? styles.upperCase : {}
                    ]}
                >
                    {this.props.someTitle}
                </Text>

                {/* {this.props.children}  */}
            </TouchableOpacity>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2c3e50"
    },
    buttonContainer: {
        backgroundColor: "#2980b9",
        paddingVertical: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 18
    },
    upperCase: {
        textTransform: "uppercase"
    }
});
