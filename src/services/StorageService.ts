
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
	
	// Saved cities
	static async getSavedCities(): Promise<Array<City> | null> {
		const cities = await AsyncStorage.getItem('savedCities');
		return cities && JSON.parse(cities);
	}

	static async storeSavedCities(cities: Array<City>): Promise<void> {
		await AsyncStorage.setItem('savedCities', JSON.stringify(cities));
	}

	static async clearSavedCities(): Promise<void> {
		await AsyncStorage.removeItem('savedCities');
	}	
}
