import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "../Screens/LoginScreen";
import LoadingScreen from "../Screens/LoadingScreen";

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

const SwichNavigator = createSwitchNavigator(
    {
        WaitingForToken: LoadingScreen,
        App: DrawerNavigator,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'WaitingForToken',
    }
);

export default createAppContainer(SwichNavigator);
