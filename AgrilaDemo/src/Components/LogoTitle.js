//import liraries
import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {Header} from 'react-native-elements';
// create a component
export default class LogoTitle extends Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <View>
                    <Image
                        style={{width: 45, height: 45}}
                        source={require('../../assets/Images/agrila_logo_2097this.png')}

                    />
                </View>
                <View>
                    <Text style={styles.headline}>
                        Agrila
                    </Text>
                </View>
            </View>

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
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 12,
        color: '#FFF',
        marginLeft: -8


    }
});
