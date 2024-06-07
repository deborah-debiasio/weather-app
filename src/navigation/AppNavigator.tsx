
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from "../screens/HistoryScreen";
import DetailsScreen from "../screens/DetailsScreen";

export const routeNames = {
	home: 'Home',
	history: 'History',
	details: 'Details',
}

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
	return <NavigationContainer>
		<Stack.Navigator
			initialRouteName={routeNames.home}
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name={routeNames.home} component={HomeScreen} />
			<Stack.Screen name={routeNames.history} component={HistoryScreen} />
			<Stack.Screen name={routeNames.details} component={DetailsScreen} />
		</Stack.Navigator>
	</NavigationContainer>
}

export default AppNavigator;
