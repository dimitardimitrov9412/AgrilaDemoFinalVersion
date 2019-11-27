import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, AsyncStorage, ActivityIndicator} from 'react-native';

import AppNavigator from "../Navigators/AppNavigator";
import axios from "axios";

export default class DetailsOfCurrentFields extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

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

    getDataFromJson() {
        let listData = [];
        let sensors = this.state.data.sensors[0];
        let descriptionData = this.state.data.description;

        Object.keys(descriptionData).forEach(element => {

            if (element == 'acreage' || element == 'soilCategory' || element == 'regionTag') {

                let item = {title: '', key: ''};
                item.key = descriptionData[element].toString();
                item.title = this.parseName(element.toString());
                if (item)
                    listData.push(item)
            }
        });

        Object.keys(sensors).forEach(element => {

            if (element != 'deviceId') {

                let item = {title: '', key: ''};

                item.title = this.parseName(element.toString());
                item.key = sensors[element].toString();
                if (item.title != "unUsed") {
                    if (item.title == "Влажност на въздуха") {
                        item.key += "%";
                    } else if ((item.title == "Почвена температура") || (item.title == "Темп.възудх")) {
                        item.key += "°C";
                    } else if (item.title == "Заряд батерия") {
                        item.key += " V";
                    } else if ((item.title == "Порив на вятъра") || item.title == "Скорост на вятъра") {
                        item.key += " m/s"
                    }
                    listData.push(item)
                }
            }
        });

        return listData;
    }

    parseName(name) {
        switch (name) {
            case 'voltage':
                return 'Заряд батерия';
            case 'soilTemperature':
                return 'Почвена температура';
            case 'windDirection':
                return 'Посока на вятъра';
            case 'maxWindSpeed':
                return 'Порив на вятъра';
            case 'airTemperature':
                return 'Темп.възудх';
            case 'acreage':
                return 'Площ[m²]';
            case 'soilCategory':
                return 'Тип почва';
            case 'airHumidity':
                return "Влажност на въздуха";
            case 'regionTag':
                return 'Регион';
            case 'meanWindSpeed':
                return "Скорост на вятъра";
            case 'soilMoisture':
                return "Почвена влага";
            default:
                return 'unUsed';
        }
        ;
    }

    componentWillMount() {
        const id = JSON.stringify(this.props.navigation.getParam('itemID'));
        const url = `https://rila.eu-gb.mybluemix.net/app/agro/field/info/${id}`;
        this._retrieveData().then(token => {
                this.fieldData(token, url)
                    .then(responseData => {

                        console.log(1, responseData.data)
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

        const {navigation} = this.props;
        return (
            this.state.data ?
                <View style={styles.container}>

                    <FlatList
                        data={this.getDataFromJson()}
                        numColumns={2}
                        renderItem={({item}) =>
                            <View style={styles.itemContainer}>
                                <Text style={styles.label}>
                                    {item.title}
                                </Text>
                                <Text style={styles.label2}>
                                    {item.key}
                                </Text>
                            </View>}
                    />
                </View> :
                <View>
                    <ActivityIndicator size="large" color="#0000ff"/>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#FFFFFF',

        justifyContent: 'center',
        color: '#fff',
    },
    itemContainer: {
        marginBottom: 20,
        marginLeft: 5,
        flex: 1, flexDirection: 'column',
    },

    label: {
        color: '#808080',
    },
    label2: {
        color: '#000000',
    },

});
