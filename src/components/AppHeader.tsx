
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images } from "../utils/images";
import { colors } from "../utils/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { textStyles } from "../styles/textStyles";


export const AppHeader = (props: AppHeaderProps) => {

    return <><SafeAreaView style={styles.safeArea}/>
		<View style={styles.container}>
			{!!props.handleBackButtonPress &&
				<TouchableOpacity style={styles.backIconContainer} onPress={props.handleBackButtonPress}>
					<Image style={styles.backIcon} source={images.backIcon} />
				</TouchableOpacity>}

			<View style={styles.titleContainer}>
                <Text style={textStyles.appHeaderTitle} maxFontSizeMultiplier={1.2}>{props.title}</Text>
			</View>
		</View>
    </>;
};


export const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: colors.primary,
	},
	container: {
		height: 130,
		width: '100%',
		backgroundColor: colors.primary,
	},
	backIconContainer: {
		height: 48,
		width: 48,
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center'
	},
	backIcon: {
		height: 24,
		width: 24,
		tintColor: colors.white,
	},
	titleContainer: {
		marginLeft: 72,
		marginRight: 16,
        marginVertical: 0,
        position: 'absolute',
        bottom: 20,
	}
});
