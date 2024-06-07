
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/colors";
import { textStyles } from "../styles/textStyles";
import { getCelsius, getImageUrl } from "../utils/utils";
import dayjs from "dayjs";
import { strings } from "../localize/strings";

export const HistoryComponent = ({ item, onPress }: HistoryComponentProps) => {

	return <TouchableOpacity style={styles.container} onPress={onPress}>
		<View style={styles.rowContainer}>
			<View style={styles.detailsContainer}>
				<Image style={styles.weatherIcon} source={{ uri: getImageUrl(item.weather[0].icon) }} />
				<View>
					<Text style={[textStyles.timestampText, styles.titleContainer]} maxFontSizeMultiplier={1.2}>{dayjs(item.dt_txt).format('DD.MM.YYYY - hh:mm')}</Text>
					<Text style={[textStyles.blackTitle, styles.titleContainer]} maxFontSizeMultiplier={1.2}>{`${item.weather[0].main}, ${getCelsius(item.main.temp)}${strings.details_celsius}`}</Text>
				</View>
			</View>
		</View>
	</TouchableOpacity>;
};

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: 72,
	},
	rowContainer: {
		width: '100%',
		paddingHorizontal: 21,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	weatherIcon: {
		height: 24,
		width: 30,
		tintColor: colors.primary,
		alignSelf: 'center',
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	titleContainer: {
		marginLeft: 32,
	}
});
