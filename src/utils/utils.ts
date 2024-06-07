
import BuildConfig from 'react-native-build-config';

export const baseURL: string = BuildConfig.BASEURL;
export const imageBaseURL: string = BuildConfig.IMAGE_BASEURL;

// Url to retrieve the image for a weather id
export const getImageUrl = (id: string): string => {
    return imageBaseURL + `/img/w/${id}.png`
}

// Convert temperature from kelvin to celsius
export const getCelsius = (kelvin: number): string => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2); // Use just 2 decimals
}