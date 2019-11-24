import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
} from "react-native";
import { Header, Left, Right, Icon } from "native-base";
import { DrawerActions } from "react-navigation";
import { Ionicons } from "react-native-vector-icons/Ionicons";
export default class Test15 extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }
    static navigationOptions = ({ navigation }) => ({
        title: "Тест15",
        headerTitleStyle: {
            textAlign: "center",
            flexGrow: 1
        },
        headerLeft: (
            <Icon
                name="menu"
                size={35}
                onPress={() => navigation.navigate("DrawerOpen")}
                style={{ padding: 10 }}
            />
        )
    });

    // title: "Тест15",
    // headerLeft: (
    //   <Icon
    //     name="menu"
    //     size={40}
    //     style={{ padding: 10 }}
    //     onPress={() => this.props.navigation.navigate("DrawerOpen")}
    //   />
    // )

    componentWillMount() {
        return fetch(
            "https://rila.eu-gb.mybluemix.net/app/out/field/description-list",
            {
                method: "GET",
                headers: {
                    Accept: "applications/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer WXpNNU5qTXhOekl0WVdNNVlTMDBNemxsTFRsaE4yRXRNakZpTWpVMFpUVXdaRFU1Ok16Y3lNRGd3TURnek1qZ3hNREV5TUE9PTpiV0Z6ZEdWeQ==`
                }
            }
        )
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    data: responseData,
                    isLoading: false
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        console.log(this.state.isLoading);
        console.log('Data in state', this.state.data);
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if(this.state.data) {
            return (
                this.state.data.map((item, index) =>
                        <View key={index}>
                            <Text>{item.description}</Text>
                        </View>
                    )
            )
        }

        return (
            <View>
                <Text> Test 15 </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: "flex-end",
        marginTop: -5,
        position: "absolute"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
