
interface AppHeaderProps {
	title?: string;
	handleBackButtonPress?: () => void;
}

interface CityComponentProps {
	title: string;
	handleOnHistoryPress: () => void;
	handleOnDetailPress: () => void;
}

interface HistoryComponentProps {
    item: WeatherResponse;
	onPress: () => void;
}

interface ServiceResponse<T> {
	error?: any;
	data?: T;
}

interface WeatherResponse {
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<WeatherDetails>;
	base: string;
    main: {
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
	visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
	dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
	timezone: number;
	id: number;
	name: string;
	cod: number;
    timestamp?: string;
    dt_txt?: string;
}

interface WeatherDetails {
	id: number;
	main: string;
	description: string;
	icon: string;
	image?: ImageProps;
}

interface City {
	id: number;
	name: string;
	country: string;
	state: string;
    coord: {
        lon: number;
        lat: number;
    };
}


interface FiveDayWeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: Array<WeatherResponse>
}