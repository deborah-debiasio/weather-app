
import { FlatList, Text, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { strings } from "../localize/strings";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { appStyles } from "../styles/appStyles";
import { textStyles } from "../styles/textStyles";
import { HistoryComponent } from "../components/HistoryComponent";
import { routeNames } from "../navigation/AppNavigator";
import { WeatherService } from "../services/WeatherService";

interface Props {
	route: {
		params: {
			city: City;
		}
	}
}

const HistoryScreen = (props: Props) => {
	const navigation = useNavigation<any>();
    const [historyData, setHistoryData] = useState<Array<WeatherResponse>>();
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const handleOnBackPress = () => {
		navigation.goBack();
	};

    const handleHistoryPress = (weather: WeatherResponse) => {
		navigation.navigate(routeNames.details, { city: props.route?.params?.city, weather: weather });
	}

	const getHistory = async (fromRefresh?: boolean) => {
		fromRefresh && setIsRefreshing(true);
		const res = await WeatherService.getWeatherDaily(props.route.params.city.name);
		setHistoryData(res.data?.list);
		fromRefresh && setIsRefreshing(false);
	}

	useEffect(() => {
		getHistory();
	}, []);

	return <View style={{ flex: 1 }}>
		<AppHeader title={`${props.route?.params?.city?.name} ${strings.history_title}`} handleBackButtonPress={handleOnBackPress} />
		<FlatList
			contentContainerStyle={{ flexGrow: 1 }}
			ListEmptyComponent={<View style={appStyles.emptyViewContainer}>
				<Text maxFontSizeMultiplier={1.2} style={textStyles.blackTitle}>{strings.history_emptyView}</Text>
			</View>}
			data={historyData}
			keyExtractor={(item: WeatherResponse, index: number) => `weather-history-${index}`}
			renderItem={({ item }) => <HistoryComponent item={item} onPress={() => handleHistoryPress(item)} />}
			refreshing={isRefreshing}
			onRefresh={() => getHistory(true)}
		/>
	</View>;
};

export default HistoryScreen;