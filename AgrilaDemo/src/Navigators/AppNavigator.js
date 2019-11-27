import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "../Screens/LoginScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import FieldsScreen from "../Screens/FieldsScreen";

const AuthStack = createStackNavigator(
    {Login: LoginScreen},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);
import DrawerNavigator from '../Navigators/DrawerNavigator';
import {Icon} from "native-base";
import React from "react";
import DetailsOfCurrentField from "../Screens/DetailsOfCurrentField";

const AppStackNavigator = createStackNavigator(
    {
        Fields: {
            screen: FieldsScreen,
            navigationOptions: {
                title: "AgrilaFields",
                headerTitleStyle: {
                    textAlign: "center",
                    flexGrow: 1
                },
                headerLeft: (
                    <Icon
                        name="menu"
                        size={35}
                        onPress={() => navigation.navigate("DrawerOpen")}
                        style={{padding: 10}}
                    />
                )
            }
        },
        Details: {
            screen: DetailsOfCurrentField,
            navigationOptions: ({navigation}) => {
                return {
                    title: navigation.getParam('title'),
                    headerTitleStyle: {
                        textAlign: "center",
                        flexGrow: 1
                    }
                }
            }
        }
    },
);

const SwichNavigator = createSwitchNavigator(
    {
        WaitingForToken: LoadingScreen,
        App: AppStackNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'WaitingForToken',
    }
);


export default createAppContainer(SwichNavigator);
