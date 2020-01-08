//import liraries
import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    AsyncStorage
} from "react-native";
import {withNavigation} from "react-navigation";
import {Item} from "native-base";
import Button from "../Components/Button";
import axios from "axios";
// create a component
export default class LoginFrom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
            errorText: ""
        };
    }

    handleEmail = text => {
        this.setState({email: text});
    };

    handlePassword = text => {
        this.setState({password: text});
    };

    componentDidMount() {
        AsyncStorage.getItem("token", (err, result) => {
            if (result) {
                this.setState({
                    token: result
                });
                console.log(this.state.token);
            } else {
                this.setState({
                    error: true
                });
            }
        });
    }

    onLoginSubmit() {
        console.log(this.state.email, this.state.password);
        // const token = Authorization ='WXpNNU5qTXhOekl0WVdNNVlTMDBNemxsTFRsaE4yRXRNakZpTWpVMFpUVXdaRFU1Ok16Y3lNRGd3TURnek1qZ3hNREV5TUE9PTpiV0Z6ZEdWeQ=='
        axios
            .post(
                "https://rila.eu-gb.mybluemix.net/signin",
                {
                    email: this.state.email,
                    password: this.state.password
                },
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                        // Authorization: `Bearer ${token}`
                    }
                }
            )
            // .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.status === 200) {
                    this.props.navigationObj.navigate("App");
                    AsyncStorage.setItem("token", jsonResponse.data.result);
                }
            })
            .catch(error => {
                if (this.state.email == "" && this.state.password == "") {
                    alert("The email and the password fileds cannot be empty!");
                } else if (this.state.email == "") {
                    alert("The email field cannot be empty");
                } else if (this.state.password == "") {
                    alert("The password field cannot be empty");
                } else {
                    alert(error);
                }
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <TextInput
                    placeholder="username or email"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    onChangeText={this.handleEmail}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    secureTextEntry
                    returnKeyType="go"
                    style={styles.input}
                    ref={input => (this.passwordInput = input)}
                    onChangeText={this.handlePassword}
                />
                <Button
                    someTitle="Login"
                    isUpperCase={true}
                    navigateTo={() => this.onLoginSubmit()}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Button>

                <View style={{height: 25}}/>
                {/* {this.state.error && <Text> ERROR </Text>} */}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    input: {
        height: 47,
        backgroundColor: "rgba(255,255,255,0.2 )",
        marginBottom: 20,
        color: "#FFF",
        paddingHorizontal: 15,
        fontSize: 21
    },
    buttonContainer: {
        backgroundColor: "#2980b9",
        paddingVertical: 10
    },
    buttonText: {
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 18
    }
});

//make this component available to the app
