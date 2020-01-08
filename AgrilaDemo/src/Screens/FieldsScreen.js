import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    ScrollView, Image,
    TouchableOpacity
} from "react-native";
import {Left, Right} from "native-base";
import {DrawerActions} from "react-navigation";
import {Ionicons} from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import {ListItem, Icon, Header, SearchBar} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import Constants from "expo-constants";


export default class FieldsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            search: '',
            allData: null,
            firstData: null,
            isUpdated: false,
            data: null
        };
    }

    checkForToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return value
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    fieldDescriptionList = async (token) => {
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

    dataForCurrentField = async (token, url) => {
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

    updateSearch = search => {
        this.setState({search});
    };

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

        this.loadData();

    }


    async loadData() {
        var firstData = '';

        try {
            let res1 = await this.checkForToken().then(token => {
                    this.fieldDescriptionList(token)
                        .then(responseData => {

                            this.setState({
                                data: responseData.data,
                                // isLoading: false,
                            });
                            firstData = responseData.data;

                            console.log(firstData);

                            firstData.forEach(element => {
                                var currentFieldData = {};
                                var newData = [];
                                var currentId = element.id;
                                var nameAndId = {
                                    id: element.id,
                                    name: element.description
                                }
                                const url = `https://rila.eu-gb.mybluemix.net/app/agro/field/info/${currentId}`;
                                this.checkForToken().then(token => {
                                    this.dataForCurrentField(token, url)
                                        .then(responseData => {

                                            //  console.log(1, responseData.data)
                                            // this.setState({
                                            //     data2: responseData.data,
                                            //     // isLoading: false
                                            // });
                                            currentFieldData = responseData.data;
                                            // console.log(currentFieldData);

                                            if (currentFieldData.sensors) {
                                                console.log(currentFieldData.sensors[0] != null);
                                                var currentDataSensors = currentFieldData.sensors[0];
                                                // console.log(currentDataSensors);
                                                const finalData = {...currentDataSensors, ...nameAndId};
                                                newData.push(finalData);

                                                if (newData.length >= 1) {
                                                    this.setState({
                                                        data: newData,
                                                        isLoading: false,
                                                    })
                                                }
                                            }
                                            // } else {
                                            //
                                            //     var acreage = {
                                            //         acreage: currentFieldData.description.acreage
                                            //     }
                                            //     const finalData = {...nameAndId, ...acreage};
                                            //     console.log(finalData);
                                            //     newData.push(finalData);
                                            // }
                                            console.log(newData);
                                            // if (currentFieldData.sensors[0]) {
                                            //     var currentSensorsData = currentFieldData.sensors[0];
                                            //     console.log('CurrentSensorsInfo', currentSensorsData);
                                            // }
                                        })
                                        .catch(error => {
                                            console.error(error);
                                        });
                                });
                            })
                            // if (firstData) {
                            //     var newData = [];
                            //     var fieldId = [];
                            //     var secondData = '';
                            //     var idOfFieldlIst = [];
                            //
                            //     firstData.forEach(element => {
                            //         var currentId = element.id;
                            //         idOfFieldlIst.push(currentId);
                            //
                            //     })
                            //
                            //     idOfFieldlIst.forEach(element => {
                            //
                            //         var currentId = element;
                            //         const url = 'https://rila.eu-gb.smybluemix.net/app/agro/field/info/125';
                            //         try {
                            //             let res2 = this.checkForToken().then(token => {
                            //                 this.dataForCurrentField(token, url)
                            //                     .then(responseData => {
                            //                         this.setState({
                            //                             data2: responseData.data,
                            //                         });
                            //                         secondData = data2;
                            //                         console.log(secondData);
                            //                     })
                            //             })
                            //         } catch
                            //             (e) {
                            //             console.warn(e);
                            //             sssss
                            //         }
                            //
                            //     })

                            // firstData.forEach(elementt => {
                            //     var id = {
                            //         id: elementt.id,
                            //         name: elementt.description
                            //     };
                            //
                            //     // const url = `https://rila.eu-gb.smybluemix.net/app/agro/field/info/${id}`;
                            //     // this.checkForToken().then(token => {
                            //     //     this.dataForCurrentField(token, url)
                            //     //         .then(responseData => {
                            //     //             secondData = responseData.data;
                            //     //             console.log('Api for CurrentField', secondData);
                            //     //         });
                            //     // });
                            // });


                            // }
                            // this.checkForToken().then(token => {
                            //     this.dataForCurrentField(token, url)
                            //         .then(responseData => {
                            //             this.setState({
                            //                 data2: responseData.data
                            //             })
                            //             secondData = responseData;
                            //             connsole.log(secondData);
                            //         });
                            // });


                            //
                            //                             var wantedId = {
                            //                                 id: secondData.description.fieldId,
                            //                                 name: secondData.description.name.toString()
                            //                             };
                            //
                            //                             const finalData = {...wantedId, ...sensors};
                            //                             //console.log(finalData);
                            //                             newData.push(finalData);
                            //
                            //                             // newData.forEach(element => {
                            //                             //     element.id = currentId;
                            //                             //console.log(newData);
                            //                             // })
                            //
                            //                         }
                            //                         if (newData.length > 1) {
                            //                             this.setState({
                            //                                 data: newData,
                            //                                 isLoading: false,
                            //                             })
                            //                         }
                            //                         console.log(newData);
                            //                         // console.log(currentId);
                            //                         // var updatedSensors = sensors.forEach(element => {
                            //                         //     element.id = secondData.description.fieldId;
                            //                         //     console.log(element.id);
                            //                         //     console.log(secondData.description.fieldId);
                            //                         // });
                            //
                            //                         // newData.push(updatedSensors);
                            //                         // newData.forEach(element => {
                            //                         //     element.id = currentId;
                            //                         // });
                            //
                            //                     }
                            //
                            //                 })
                            //                 .catch(error => {
                            //                     console.error(error);
                            //                 });
                            //         });
                            //     })
                            // }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            );

            // this.state.firstData.forEach(element => {
            //    let id = element.id;
            //     const url = `https://rila.eu-gb.mybluemix.net/app/agro/field/info/${id}`;
            // });

        } catch
            (e) {
            console.warn(e);

        }
    }

    // var firstData = this.state.data;
    // if(firstData) {
    //     firstData.foreach(function (element) {
    //        em let id = elent.id;
    //         const url = `https://rila.eu-gb.mybluemix.net/app/agro/field/info/${id}`;
    //         _retrieveData().then(token => {
    //             fieldAllData(token, url)
    //                 .then(responseData => {
    //
    //                     console.log(1, responseData.data)
    //                     this.setState({
    //                         allData: responseData.data,
    //                         isLoading: false
    //                     });
    //                 })
    //                 .catch(error => {
    //                     console.error(error);
    //                 });
    //         });
    //
    //
    //     });
    // }


    // dataFromFirstAPI.forEach((element, index, array) => {
    //     console.log('Description:', element.description);
    //     console.log(index);
    //     console.log(dataFromFirstAPI);
    //
    // });


    //         // var firstData = this.state.data;
    //         // var secondData = this.state.allData;
    //         // var sensors = secondData.sensors[0];
    //         this.state.data.forEach((element, index) => {
    //             this._retrieveData().then(token => {
    //                     this.fieldAllData(token)
    //                         .then(responseData => {
    //                             this.setState({
    //                                 allData: responseData.data,
    //                                 isLoading: false
    //                             });
    //                         }).catch(error => {
    //                         console.error(error);
    //                     });
    //                 }
    //             );
    //
    //             if (this.state.allData) {
    //
    //                 var sensors = this.state.allData.sensors[0];
    //                 if (element.id === this.state.allData.description.fieldId) {
    //                     console.log('6', element.id === this.state.allData.description.fieldId);
    //                     Object.keys(sensors).forEach(element => {
    //                         if (element === 'airTemperature' || element === 'maxWindSpeed' || element === 'rainAmoutToday') {
    //                             let item = {title: '', key: ''};
    //                             item.key = sensors[element].toString();
    //                             console.log('(7)itemKey', item.key);
    //
    //                             item.title = element.toString();
    //                             console.log('(8)itemKey', temp.title);
    //                             this.setState(
    //                                 this.state.data.splite(index, 0, item)
    //                             );
    //
    //                         }
    //
    //                     });
    //                 }
    //                 console.log('(3)', this.state.data);
    //
    //             }
    //
    //         });
    //
    //     }
    // }


    render() {

        // console.log("(2) - Render:", this.state.data);
        // console.log('SecondData:', this.state.allData);
        // console.log('Data in state', this.state.data);
        // console.log(this.props);
        // console.log(this.state.allData);

        const {search} = this.state;

        if (this.state.isLoading) {
            return (
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
        } else {
            return (

                <View style={styles.container}>
                    {/*<Icon*/}
                    {/*    reverse*/}
                    {/*    name='md-thermometer'*/}
                    {/*    type='ionicon'*/}
                    {/*    color='#517fa4'*/}
                    {/*/>*/}
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                    <ScrollView style={styles.scrollView}>

                        <FlatList
                            data={this.state.data}
                            //keyExtractor={item => item.id.toString()}
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
                                    title={item.name}
                                    subtitle={
                                        <View>
                                            <Image source={require('../Icons/airTemperature.png')}
                                                   style={{
                                                       width: 30,
                                                       height: 30,

                                                   }}/>
                                            <Text>
                                                {item.airTemperature}
                                            </Text>

                                            <Image source={require('../Icons/rainAmountToday.png')}
                                                   style={{
                                                       width: 30,
                                                       height: 30
                                                   }}/>
                                            <Text>
                                                {item.rainAmountToday}
                                            </Text>

                                            <Image source={require('../Icons/meanWindSpeed.png')}
                                                   style={{
                                                       width: 30,
                                                       height: 30
                                                   }}/>

                                            <Text>
                                                {item.meanWindSpeed}
                                            </Text>

                                        </View>

                                    }

                                    // leftAvatar={{
                                    //     title: "Mitko",
                                    //     source: require("../Icons/cold.png"),
                                    //     showEditButton: false,
                                    // }}
                                    // rightAvatar={{
                                    //     source: require('../Icons/rain.png'),
                                    //     //title: item.rainAmountToday.toString()
                                    // }}
                                    //leftTitle={item.airTemperature.toString()}
                                    //  rightTitle={item.rainAmountToday.toString()}
                                    //subtitle={}
                                    //rightIcon={require("../Icons/cold.png")}
                                    titleStyle={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: 17,
                                        paddingTop: 2,
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                    // subtitleStyle={{
                                    //     color: 'black',
                                    //     fontWeight: 'bold',
                                    //     fontSize: 17,
                                    //     textAlign: 'left',
                                    // }}
                                    //subtitle={JSON.stringify(item.id)}
                                    bottomDivider
                                    chevron={{color: 'white', size: 30, fontWeight: 'bold'}}
                                    onPress={() => this.props.navigation.navigate("Details",
                                        {
                                            itemID: item.id,
                                            title: item.name,

                                        })}
                                />
                            }
                        />

                    </ScrollView>

                </View>
            )
            // if (this.state.allData) {
            //     var dataFromSecondApi = this.state.allData;
            //     var sensors = dataFromSecondApi.sensors[0];
            //
            //     Object.keys(dataFromFirstApi).forEach(index, element => {
            //         if (dataFromFirstApi.element.id === dataFromSecondApi.description.fieldId) {
            //             console.log('IF:', dataFromFirstApi.element.id === dataFromSecondApi.description.fieldId);
            //             Object.keys(sensors).forEach(element => {
            //                 if (element === 'airTemperature') {
            //                     var item = {title: '', key: ''};
            //                     datafromFirstApi.splice(index, 0, item);
            //                     console.log(dataFromFirstApi);
            //                 }
            //             })
            //         }
            //
            //     });
            // }
            console.log('FIRST', this.state.allData);


        }
    }
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: "flex-end",
        marginTop: -5,
        position: "absolute"
    },
    basic: {
        backgroundColor: '#12ff71',
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    containerForSafeView: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    scrollView: {
        backgroundColor: '#4b4f5e',

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});

