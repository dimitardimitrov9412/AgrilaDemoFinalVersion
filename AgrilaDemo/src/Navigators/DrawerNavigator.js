import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image,
    Button,
    AsyncStorage
} from "react-native";
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Test9 from "../Screens/Test9.js";
import Test16 from "../Screens/Test16";
import Test14 from "../Screens/Test14";
import Test10 from "../Screens/Test10";
import FieldsScreen from "../Screens/FieldsScreen";
import DO_NOT_DELETE from "../Screens/DO_NOT_DELETE";


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
        Test15: {screen: FieldsScreen},
        Test9: {screen: Test9},
        Test16: {screen: Test16},
        Test10: {screen: Test10},
        Test14: {screen: Test14},
        DO_NOT_DELETE: {screen: DO_NOT_DELETE}
    },
    {
        contentComponent: CustomDrawerComponent
    }
);

export default DrawerNavigator;
