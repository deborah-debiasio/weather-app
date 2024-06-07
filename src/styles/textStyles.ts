
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";

export const textStyles = StyleSheet.create({
    appHeaderTitle: {
        fontSize: 24,
        color: colors.white,
        fontFamily: fonts.regular,
    },
    blackTitle: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.bold,
    },
    whiteTitle: {
        fontSize: 14,
        color: colors.white,
        fontFamily: fonts.bold,
    },
    textInput: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.regular,
    },
    blackText: {
        fontSize: 14,
        color: colors.black,
        fontFamily: fonts.regular,
    },
    primaryText: {
        fontSize: 20,
        color: colors.primary,
        fontFamily: fonts.regular,
    },
    blackTitleRegular: {
        fontSize: 24,
        color: colors.black,
        fontFamily: fonts.regular,
        textAlign: 'center',
    },
    timestampText: {
        fontSize: 12,
        color: colors.timestampGrey,
        fontFamily: fonts.regular,
    },
});
