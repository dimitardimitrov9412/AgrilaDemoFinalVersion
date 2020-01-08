import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    AsyncStorage,
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView, TouchableOpacity
} from 'react-native';
import FontAwesome, {Icons} from 'react-native-fontawesome';

import AppNavigator from "../Navigators/AppNavigator";
import axios from "axios";
import Constants from 'expo-constants';
import TouchableScale from "react-native-touchable-scale";
import {ListItem} from "react-native-elements";


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


        // let descriptionData = this.state.data.description;
        //
        // Object.keys(descriptionData).forEach(element => {
        //
        //     if (element == 'acreage' || element == 'soilCategory' || element == 'regionTag') {
        //         let item = {title: '', key: ''};
        //         item.key = descriptionData[element].toString();
        //         item.title = this.parseName(element.toString());
        //         if (item)
        //             listData.push(item)
        //     }
        // });

        if (sensors) {
            Object.keys(sensors).forEach(element => {

                if (element == 'meanWindSpeed' || element == 'leafWetness' || element == 'rainAmountToday' || element == 'airTemperature'
                    || element == 'airHumidity' || element == 'soilTemperature' || element == 'soilMoisture'
                    || element == 'soilMoisture2') {

                    let item = {title: '', key: '', iconName: ''};

                    item.iconName = element.toString();
                    console.log('TEST:', item.iconPath);
                    item.title = this.parseName(element.toString());
                    item.key = sensors[element].toString();
                    if (item.title != "unUsed") {
                        if (item.title == "Влажност на въздуха" || item.title == 'Листна влага'
                            || item.title == 'Почвена влага на 30см дълбочина' || item.title == 'Почвена влага на 1м дълбочина') {
                            item.key += "%";
                        } else if ((item.title == "Почвена температура") || (item.title == "Темп.възудх")) {
                            item.key += "°C";
                        } else if (item.title == "Заряд батерия") {
                            item.key += " V";
                        } else if ((item.title == "Порив на вятъра") || item.title == "Скорост на вятъра") {
                            item.key += " м/с"
                        } else if ((item.title == "Валежна сума за 24 часа")) {
                            item.key += " л/м² "
                        }
                        listData.push(item)
                    }
                }
            });
        }
        console.log('listDat:', listData);
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
                return "Почвена влага на 30см дълбочина";
            case 'leafWetness':
                return "Листна влага";
            case 'rainAmountToday':
                return "Валежна сума за 24 часа";
            case 'soilMoisture2':
                return "Почвена влага на 1м дълбочина";
            default:
                return 'unUsed';
        }
        ;
    }

    componentDidMount() {
        const id = JSON.stringify(this.props.navigation.getParam('itemID'));
        console.log('This Id', id);
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
        });

    }

    render() {

        let icons = {
            'airHumidity': require('../Icons/airHumidity.png')
            , 'leafWetness': require('../Icons/leafWetness.png')
            , 'meanWindSpeed': require('../Icons/meanWindSpeed.png')
            , 'airTemperature': require('../Icons/airTemperature.png')
            , 'rainAmountToday': require('../Icons/rainAmountToday.png')
            , 'soilMoisture': require('../Icons/soilMoisture.png')
            , 'soilTemperature': require('../Icons/soilTemperature.png')
            , 'soilMoisture2': require('../Icons/soilMoisture.png')


        };

        const {navigation} = this.props;
        return (
            this.state.data ?

                <ScrollView style={styles.scrollView}>
                    <SafeAreaView style={styles.containerForSafeView}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onPress}
                        >

                            <FlatList
                                style={{width: '100%'}}
                                data={this.getDataFromJson()}
                                //numColumns={1}
                                renderItem={({item}) =>
                                    <ListItem
                                        Component={TouchableScale}
                                        friction={120}
                                        tension={100}
                                        activeScale={0.95}
                                        linearGradientProps={{
                                            colors: ['#73736f', '#38c76e'],
                                            start: [1, 0],
                                            end: [0.2, 0],
                                        }}
                                        key={item.id}
                                        title={item.title}
                                        leftAvatar={<Image source={icons [item.iconName]}
                                                           style={{width: 50, height: 50}}/>}
                                        rightSubtitle={item.key}
                                        rightSubtitleStyle={{color: '#222436', fontWeight: 'italic', fontSize: 17}}
                                        titleStyle={{color: 'white', fontWeight: 'bold', fontSize: 18,}}
                                        bottomDivider
                                    > </ListItem>
                                }
                            />

                            {/*        <View style={styles.itemContainer}>*/}
                            {/*            <Text style={[styles.second]}>*/}
                            {/*                title={}*/}
                            {/*                <Image source={icons[item.iconName]}/> {item.title}*/}
                            {/*            </Text>*/}
                            {/*            <Text style={styles.second}> {item.key} </Text>*/}
                            {/*            /!*<Text style={styles.label2}>*!/*/}
                            {/*            /!*    {item.key}*!/*/}
                            {/*            /!*</Text>*!/*/}
                            {/*        </View>}*/}
                            {/*/>*/}
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView> :

                <ScrollView style={styles.scrollView}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Image
                        source={require("../../assets/Images/agrila_logo_2097this.png")}
                        style={{
                            marginTop: 100,
                            height: 320,
                            width: 320,
                            borderRadius: 60,
                            alignSelf: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </ScrollView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#626363',

        justifyContent: 'center',
        color: '#fff',
    },
    containerForSafeView: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    itemContainer: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: '#FFF'
    },
    first: {
        fontSize: 30,
        lineHeight: 40,
        color: '#FFF',
        width: 130,
        marginRight: 15,
        fontWeight: 'bold'
    },
    second: {
        fontSize: 20,
        lineHeight: 40,
        color: '#FFF'
    },

    label: {
        color: '#808080',
    },
    label2: {
        color: '#000000',
    },

    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"
    },
    item: {
        backgroundColor: '#34b7eb',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    scrollView: {
        backgroundColor: '#4b4f5e',
    },
});
