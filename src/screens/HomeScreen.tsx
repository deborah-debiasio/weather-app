
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AppHeader } from "../components/AppHeader";
import { strings } from "../localize/strings";
import { useEffect, useState } from "react";
import { CityComponent } from "../components/CityComponent";
import { useNavigation } from "@react-navigation/native";
import { routeNames } from "../navigation/AppNavigator";
import { appStyles } from "../styles/appStyles";
import { images } from "../utils/images";
import { textStyles } from "../styles/textStyles";
import { AddCityModal } from "../components/AddCityModal";
import { StorageService } from "../services/StorageService";

const HomeScreen = () => {
	const navigation = useNavigation<any>();
	const [addCityModalVisible, setAddCityModalVisible] = useState<boolean>(false);
	const [savedCities, setSavedCities] = useState<Array<City>>([]);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const handleOnDetailPress = (city: City) => {
		navigation.navigate(routeNames.details, { city: city });
	}

	const handleOnHistoryPress = (city: City) => {
		navigation.navigate(routeNames.history, { city: city });
	}

	const handleAddCityPress = () => {
		setAddCityModalVisible(true)
	}

	const getSavedCities = async () => {
		setIsRefreshing(true);
		const cities = await StorageService.getSavedCities();
		cities !== null && setSavedCities(cities);
		setIsRefreshing(false);
	};

    useEffect(() => {
        // Refresh list every time the add city modal is closed
		!addCityModalVisible && getSavedCities();
	}, [addCityModalVisible]);

	return <View style={{ flex: 1 }}>
		<AppHeader title={strings.home_title} />

		<FlatList
			contentContainerStyle={[{ paddingBottom: 100, flex: 1 }]}
			refreshing={isRefreshing}
			onRefresh={getSavedCities}
			showsVerticalScrollIndicator={false}
			data={savedCities}
			renderItem={({ item, index }) => <CityComponent
				key={`saved-city-${index}`}
				title={`${item.name}, ${item.country}`}
				handleOnDetailPress={() => handleOnDetailPress(item)}
				handleOnHistoryPress={() => handleOnHistoryPress(item)}
			/>}
			ListEmptyComponent={() => <View style={appStyles.emptyViewContainer}>
                <Text style={textStyles.blackTitle} maxFontSizeMultiplier={1.2}>{strings.emptyView_noFavouriteCity}</Text>
			</View>}
		/>

		<TouchableOpacity style={appStyles.home_addCityView} onPress={handleAddCityPress}>
			<View style={[appStyles.rowView, { justifyContent: 'center' }]}>
				<Image style={appStyles.addIcon} source={images.addIcon} />
                <Text style={[textStyles.whiteTitle, { marginLeft: 14 }]} maxFontSizeMultiplier={1.2}>{strings.home_addCity}</Text>
			</View>
		</TouchableOpacity>

		{addCityModalVisible &&
			<AddCityModal modalVisible={addCityModalVisible} onRequestClose={() => setAddCityModalVisible(false)} />}
	</View>;
};

export default HomeScreen;
