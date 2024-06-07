
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../utils/images";
import { colors } from "../utils/colors";
import { textStyles } from "../styles/textStyles";

export const CityComponent = (props: CityComponentProps) => {

	return <View style={styles.container}>
		<View style={styles.rowContainer}>
			<TouchableOpacity style={styles.detailsContainer} onPress={props.handleOnHistoryPress}>
				<Image style={styles.cityIcon} source={images.cityIcon} />
				<Text style={[textStyles.blackTitle, styles.titleContainer]} maxFontSizeMultiplier={1.2}>{props.title}</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.detailsContainer} onPress={props.handleOnDetailPress}>
				<Image style={styles.infoIcon} source={images.infoIcon} />
			</TouchableOpacity>
		</View>
	</View>;
};

export const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		height: 56,
	},
	rowContainer: {
		width: '100%',
		paddingHorizontal: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	cityIcon: {
		height: 24,
		width: 24,
		tintColor: colors.primary,
	},
	detailsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	infoIcon: {
		height: 24,
		width: 24,
		tintColor: colors.primary,
	},
	titleContainer: {
		marginLeft: 32,
	}
});
