//import liraries
import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import {
    Container,
    Content,
    Button,
    Header,
    Form,
    Item,
    Input,
    Label
} from "native-base";
import LoginFrom from "../Components/Loginform";

export default class LoginScreen extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     test: 1
    //   };
    // }

    // componentDidMount() {
    //   this.setState({ test: 2 });
    // }

    render() {
        const titleForResetPass = "Reset";

        return (
            <KeyboardAvoidingView
                behavior={"padding"}
                style={styles.container}
            >
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/Images/agrila_logo_2097this.png")}
                        style={{width: 225, height: 225}}
                    />
                    <Text style={styles.title}>Welcome to AGRILA!</Text>
                    <Text style={styles.title2}>
                        {" "}
                        Modular system for smart agriculture{" "}
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginFrom navigationObj={this.props.navigation}/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
// create a component
//
//   static navigationOptions = {};

//   render() {
//     return (
//       <Container style={styles.container}>
//         <Form>
//           <Button
//             style={styles.loginButton}
//             full
//             rounded
//             success
//             onPress={() => this.props.navigation.navigate("LoginScreen")}
//           >
//             <Text style={styles.text}> Login </Text>
//           </Button>
//           <Button style={styles.loginButton} full rounded success>
//             <Text style={styles.text}> SignUp </Text>
//           </Button>
//         </Form>
//       </Container>

//       // <View style={styles.container}>
//       //   <Button title="Log in" onPress={() => this.props.navigation.navigate('LoginScreen')}/>
//       //   <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUpScreen')} />
//       // </View>
//     );
//   }
// }

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#3498db"
    },
    logo: {
        width: 100,
        height: 100
    },
    logoContainer: {
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"
    },
    title: {
        color: "#FFF",
        marginTop: 15,
        fontSize: 20,
        textAlign: "center",
        opacity: 0.9
    },
    title2: {
        color: "#FFF",
        marginTop: 5,
        fontSize: 17.5,
        textAlign: "center",
        opacity: 0.9
    }
});
