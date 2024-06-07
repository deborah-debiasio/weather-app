
import {  Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { appStyles } from "../styles/appStyles";
import { images } from "../utils/images";
import { colors } from "../utils/colors";
import { textStyles } from "../styles/textStyles";
import { JSX, useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { cities } from "../utils/cities";
import { StorageService } from "../services/StorageService";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { strings } from "../localize/strings";

interface AddCityModalComponent {
	modalVisible: boolean;
	onRequestClose: () => void;
}

export const AddCityModal = (props: AddCityModalComponent) => {
	const [savedCities, setSavedCities] = useState<Array<City>>([]);
	const [citiesList, setCitiesList] = useState<Array<City>>([]);
	const [searchedValue, setSearchedValue] = useState<string>();
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['40%', '80%'], []);

	const handleSheetChanges = useCallback((index: number) => {
		index === 0 && props.onRequestClose();
	}, []);

    const handleOnPressItem = async (item: City) => {
        setSearchedValue('');
		const saved = savedCities;
		if (isCitySaved(item)) { // if already saved, remove from the list of favourite cities
			const index = savedCities.findIndex((value) => item.id === value.id);
			if (index !== -1) {
				saved.splice(index, 1);
			}
		} else { // add to favourite
			saved.push(item);
		}
		await StorageService.storeSavedCities(saved);
		setSavedCities([...saved]);
		setCitiesList([...cities]);
	}

	const isCitySaved = (item: City): boolean => {
		const filtered = savedCities.filter((value: City) => value.id === item.id);
		return filtered.length > 0;
	}

	useEffect(() => {
		const getSavedCities = async () => {
			const cities = await StorageService.getSavedCities();
			cities !== null && setSavedCities(cities);
			bottomSheetRef.current?.expand();
		};

		if (props.modalVisible) {
			setCitiesList(cities);
			getSavedCities();
		}

	}, [props.modalVisible]);

    
    // Search cities
	useEffect(() => {
		if (searchedValue) {
			const filtered: Array<City> = cities.filter((value: City) => value.name.toLocaleLowerCase().includes(searchedValue.toLocaleLowerCase()));
			setCitiesList(filtered);
		} else {
			setCitiesList(cities);
		}
	}, [searchedValue]);

	const renderBackdrop = useCallback((backdropProps: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
		<BottomSheetBackdrop
			{...backdropProps}
			disappearsOnIndex={0}
			appearsOnIndex={1}
			opacity={0.5}
			pressBehavior='collapse'
		/>
	), []);

	return <BottomSheetModalProvider>
		<BottomSheet
			ref={bottomSheetRef}
			index={1}
			snapPoints={snapPoints}
			onChange={handleSheetChanges}
			onClose={props.onRequestClose}
			backdropComponent={renderBackdrop}
            animateOnMount={true}
		>
			<View style={{ paddingBottom: 10 }}>
				<View style={styles.searchTabContainer}>
					<View style={{ flexDirection: 'row' }}>
						<Image style={styles.searchIcon} source={images.searchIcon} />
						<TextInput
							style={[styles.textInput, textStyles.textInput]}
							placeholderTextColor={colors.grey}
                            defaultValue={searchedValue}
							onChangeText={(value: string) => setSearchedValue(value)}
                            placeholder={strings.home_searchCity}
                            maxFontSizeMultiplier={1.2}
						/>
					</View>
				</View>
				
				<FlatList
					contentContainerStyle={[ { paddingBottom: 100 }]}
					showsVerticalScrollIndicator={false}
                    data={citiesList}
                    extraData={savedCities}
					renderItem={({ item, index }) => <TouchableOpacity key={`city-${index}`} style={styles.cityContainer} onPress={() => handleOnPressItem(item)}>
						<View style={[appStyles.rowView, { marginHorizontal: 24 }]}>
                            <Text style={textStyles.blackTitle} maxFontSizeMultiplier={1.2}>{`${item.name}, ${item.country} `}</Text>
							{isCitySaved(item) === true && <Image style={styles.checkIcon} source={images.checkIcon} />}
						</View>
                    </TouchableOpacity>}
                    ListEmptyComponent={() => <View style={[appStyles.emptyViewContainer, { marginVertical: 20 }]}>
                        <Text style={textStyles.blackTitle} maxFontSizeMultiplier={1.2}>{strings.emptyView_noCitySearchResult}</Text>
                    </View>}
				/>
			</View>
		</BottomSheet>
	</BottomSheetModalProvider>
};


export const styles = StyleSheet.create({
	modalContainer: {
		height: 200,
		backgroundColor: colors.white
	},
	cityContainer: {
		height: 50,
		justifyContent: 'center',
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: colors.grey
	},
	searchTabContainer: {
		height: 56,
		justifyContent: 'center',
		marginHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: colors.grey
	},
	searchIcon: {
		height: 24,
		width: 24,
        tintColor: colors.primary,
        alignSelf: 'center',
	},
	checkIcon: {
		height: 24,
		width: 24,
		tintColor: colors.primary,
	},
	textInput: {
		marginLeft: 32,
	}
});
