import React, {Component} from "react";
import {
    View,
    SafeAreaView,
    Image,
    Button,
    AsyncStorage
} from "react-native";
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import FieldsScreen from "../Screens/FieldsScreen";
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from "native-base";
import DetailsOfCurrentField from "../Screens/DetailsOfCurrentField";
import LogoTitle from "../Components/LogoTitle";

const AppStackNavigator = createStackNavigator(
    {
        Fields: {
            screen: FieldsScreen,
            navigationOptions: ({navigation}) => {
                return {

                    //
                    // headerTitle: (
                    //     <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    //         <Image
                    //             source={require('../../assets/Images/agrila_logo_2097this.png')}
                    //             style={{width: 50, height: 50}}
                    //         />
                    //
                    //
                    //     </View>
                    // ),
                    headerTitle: () => <LogoTitle/>,
                    title: "Agrila",
                    headerTitleStyle: {
                        textAlign: "center",
                        flexGrow: 1,
                        alignSelf: 'center',
                        color: '#FFF',
                        fontWeight: 'bold',

                    },
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#a9adb0'
                    },
                    headerLeft: (
                        <Icon
                            name="menu"
                            size={39}
                            onPress={() => navigation.openDrawer()}
                            style={{padding: 10, color: 'black'}}

                        />
                    ),
                    headerRight: (
                        <Icon
                            name="menu"
                            size={35}
                            onPress={() => navigation.openDrawer()}
                            style={{padding: 10}}
                        />
                    )
                }
            }
        },
        Details: {
            screen: DetailsOfCurrentField,
            navigationOptions: ({navigation}) => {
                return {
                    title: navigation.getParam('title'),
                    headerStyle: {
                        backgroundColor: '#a9adb0'
                    },
                    headerTitleStyle: {
                        textAlign: "center",
                        flexGrow: 1,
                    }

                }
            }
        }
    },
);


const CustomDrawerComponent = props => (
    <SafeAreaView style={{flex: 1}}>
        <View
            style={{
                height: 150,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Image
                source={require("../../assets/Images/agrila_logo_2097this.png")}
                style={{height: 130, width: 130, borderRadius: 60}}
            />
        </View>

        <DrawerItems style={{marginTop: 15}} {...props} />

        <Button title="Logout" onPress={() => logout(props)}/>
    </SafeAreaView>
);

const logout = (props) => {
    AsyncStorage.clear();
    props.navigation.navigate('Auth');
};

const DrawerNavigator = createDrawerNavigator({
        AgrilaFields: {screen: AppStackNavigator}
    },
    {
        contentComponent: CustomDrawerComponent
    }
);

export default DrawerNavigator;
