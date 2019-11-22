import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Image
} from "react-native";
import {DrawerNavigator, StackNavigator, DrawerItems} from "react-navigation";
import Test9 from "./Test9.js";
import Test16 from "./Test16";
import Test14 from "./Test14";
import Test10 from "./Test10";
import DO_NOT_DELETE from "./DO_NOT_DELETE";
import Test15 from "../Screens/Test15";


export default Test15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
// const innerStackNavigator = new StackNavigator({
//   TabNavigator: {
//     screen: HomeScreenTabNavigator
//   }

// const CustomDrawerComponent = props => (
// <SafeAreaView style={styles.container}>
//   <View
// style={{
//   height: 150,
//   backgroundColor: "white",
//   justifyContent: "center",
//   alignItems: 'center',
//   paddingTop:20
// }}

// {
/* <Image
source={require("./../Images/agrilaaaaaaaaa.jpg")}
style={{ height: 80, width: 80, borderRadius: 100 }}
/>
<ScrollView>
<DrawerItems {...props} />
</ScrollView>
</View>
</SafeAreaView>
); */
// }
// const CustomDrawerComponent = props => (
//   <SafeAreaView style={{ flex: 1 }}>
//     <View
//       style={{
//         height: 150,
//         backgroundColor: "white",
//         alignItems: "center",
//         justifyContent: "center"
//       }}
//     >
//       <Image
//         source={require("./../Images/agrila-cropped.png")}
//         style={{ height: 120, width: 120, borderRadius: 60 }}
//       />
//     </View>

//     <DrawerItems style={{ marginTop: 15 }} {...props} />
//   </SafeAreaView>
// );

// const AppDrawerNavigator = new DrawerNavigator(
//   {
//     Тест15: {
//       screen: HomeScreen
//     },
//     Тест9: { screen: Test9 },
//     Тест16: { screen: Test16 },
//     Тест10: { screen: Test10 },
//     Тест14: { screen: Test14 },
//     DO_NOT_DELETE: { screen: DO_NOT_DELETE }
//   },
//   {
//     contentComponent: CustomDrawerComponent
//   }
// );

// export default AppDrawerNavigator;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });
