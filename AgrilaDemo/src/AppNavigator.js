import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from "./Screens/LoginScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import HomeScreen from './Screens/HomeScreen';

const AppStack = createStackNavigator({Home: HomeScreen});
const AuthStack = createStackNavigator({Login: LoginScreen});

const SwichNavigator = createSwitchNavigator(
    {
        WaitingForToken: LoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'WaitingForToken',
    }
)

export default createAppContainer(SwichNavigator);
