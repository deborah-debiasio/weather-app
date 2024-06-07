
import { Text, View, Image, ActivityIndicator } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { WeatherService } from "../services/WeatherService";
import { useEffect, useState } from "react";
import { strings } from "../localize/strings";
import { getCelsius, getImageUrl } from "../utils/utils";
import { appStyles } from "../styles/appStyles";
import { textStyles } from "../styles/textStyles";
import { colors } from "../utils/colors";
import dayjs from "dayjs";

interface Props {
	route: {
		params: {
            city?: City;
            weather?: WeatherResponse
		}
	}
}

const DetailsScreen = (props: Props) => {
	const navigation = useNavigation<any>();
	const [weatherData, setWeatherData] = useState<WeatherResponse>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleOnBackPress = () => {
		navigation.goBack();
	};

	const loadData = async () => {
        if (props?.route?.params?.city) {
            setIsLoading(true);
            const res = await WeatherService.getWeather(props?.route?.params?.city?.name);
            if (res.data && !res.error) {
				setWeatherData(res.data);
            }
            setIsLoading(false);
        }
	}

	const data: Array<{ key: string, value: string }> = [
		{
			key: strings.details_description,
			value: weatherData?.weather[0].main ?? strings.details_valueNotAvailable,
		},
		{
			key: strings.details_temperature,
			value: weatherData?.main?.temp ? `${getCelsius(weatherData?.main?.temp)}${strings.details_celsius}` : strings.details_valueNotAvailable,
		},
		{
			key: strings.details_humidity,
			value: weatherData?.main?.humidity ? `${(weatherData?.main?.humidity)?.toString()} ${strings.details_percentage}` : strings.details_valueNotAvailable,
		},
		{
			key: strings.details_windspeed,
			value: weatherData?.wind?.speed ? `${(weatherData?.wind?.speed)?.toString()} ${strings.details_kmh}` : strings.details_valueNotAvailable,
		}
	];

	useEffect(() => {
		if (props.route.params.weather) {
			console.log('props.route.params.weather ', props.route.params.weather)
            setWeatherData(props.route.params.weather);
		} else {
			loadData();
		}
	}, []);


	return <View>
		<AppHeader handleBackButtonPress={handleOnBackPress} />
		{isLoading ?
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color={colors.primary} size={'large'} />
			</View>
			:
			<View style={appStyles.details_container}>
                <Text style={textStyles.blackTitleRegular} maxFontSizeMultiplier={1.2}>{`${props?.route?.params?.city?.name}, ${props?.route?.params?.city?.country}`}</Text>

				<Text style={[textStyles.timestampText, { textAlign: 'center' }]} maxFontSizeMultiplier={1.2}>{dayjs(weatherData?.dt_txt).format('DD.MM.YYYY - hh:mm')}</Text>

				{weatherData?.weather && weatherData?.weather.length > 0 &&
					<Image style={appStyles.details_image} source={{ uri: getImageUrl(weatherData.weather[0].icon) }} />}

				{data.map((value, index) => <View key={`weather-detail ${index}`} style={[appStyles.rowView, { height: 24 }]}>
                    <Text style={textStyles.blackTitle} maxFontSizeMultiplier={1.2}>{value.key}</Text>
                    <Text style={textStyles.primaryText} maxFontSizeMultiplier={1.2}>{value.value}</Text>
				</View>)}

			</View>}
	</View>;
};

export default DetailsScreen;