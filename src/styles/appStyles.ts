
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export const appStyles = StyleSheet.create({
    home_addCityView: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        height: 56,
        width: 137,
        borderRadius: 28,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addIcon: {
        height: 21,
        width: 18,
        tintColor: colors.white,
    },
    emptyViewContainer: {
        marginHorizontal: 16,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    details_container: {
        marginHorizontal: 32,
        backgroundColor: colors.white,
        paddingHorizontal: 32,
        paddingTop: 26,
        paddingBottom: 30,
        marginTop: -40,
        borderRadius: 4,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 7,
        elevation: 7,
        zIndex: 999,
    },
    details_image: {
        height: 77,
        width: 94,
        alignSelf: 'center',
        marginTop: 68,
        marginBottom: 76,
        tintColor: colors.primary,
    }
});
