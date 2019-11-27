import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
} from "react-native";
import {Header, Left, Right, Icon} from "native-base";
import {DrawerActions} from "react-navigation";
import {Ionicons} from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import {ListItem} from 'react-native-elements';

export default class FieldsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: true};
    }


    // title: "Тест15",
    // headerLeft: (
    //   <Icon
    //     name="menu"
    //     size={40}
    //     style={{ padding: 10 }}
    //     onPress={() => this.props.navigation.navigate("DrawerOpen")}
    //   />
    // )
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

    fieldData = async (token) => {
        return axios.get(
            "https://rila.eu-gb.mybluemix.net/app/out/field/description-list",
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
        this._retrieveData().then(token => {
                this.fieldData(token)
                    .then(responseData => {
                        this.setState({
                            data: responseData.data,
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
        console.log(this.state.isLoading);
        console.log('Data in state', this.state.data);
        console.log(this.props);
        if (this.state.isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
            );
        }

        if (this.state.data) {
            return (
                <View>
                    {this.state.data.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.description}
                            subtitle={JSON.stringify(item.id)}
                            bottomDivider
                            chevron
                            chevronColor='blue'
                            chevronSize={15}
                            onPress={() => this.props.navigation.navigate("Details",
                                {
                                    itemID: item.id,
                                    title: item.description
                                })}
                        />


                    ))
                    }
                </View>
            )
        }

        return (
            <View>
                <Text> Network error</Text>
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
